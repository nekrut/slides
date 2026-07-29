/**
 * Data components — written as fenced blocks so the payload stays tabular:
 *
 *   ```metrics accent=sky
 *   Human branches dN/dS | 0.0224
 *   ```
 *
 * Every human-facing field is passed through markdown inline rendering, so
 * **bold**, `code` and links work inside them.
 */

import { accentClass, classList, esc, fields, parseAttrs, styleAttr } from './attrs.mjs'

const BR = / \/\/ | \|\| /g
const inline = (md, env, text) => md.renderInline(String(text ?? '').replace(BR, '<br>'), env)

const lines = (content) =>
  String(content)
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))

/** Split `key: rest` prefixes used by the multi-record fences. */
function record(line) {
  const m = line.match(/^([a-zA-Z][\w-]*)\s*:\s*([\s\S]*)$/)
  return m ? { key: m[1].toLowerCase(), rest: m[2] } : { key: '', rest: line }
}

/**
 * Peel trailing `k=v` fields and known flag words off a record, leaving the
 * positional fields untouched. Consuming only from the end keeps a label that
 * happens to read like a flag (`open`, `lg`) in its proper column.
 */
function takeAttrs(list, flagWords = []) {
  const known = new Set(flagWords)
  const plain = [...list]
  const raw = []
  const flags = new Set()

  while (plain.length) {
    const last = plain[plain.length - 1]
    if (/^[\w-]+=/.test(last)) raw.unshift(plain.pop())
    else if (known.has(last)) flags.add(plain.pop())
    else break
  }

  const parsed = parseAttrs(raw.join(' '))
  for (const flag of parsed.flags) flags.add(flag)
  return { plain, attrs: parsed.attrs, flags, classes: parsed.classes }
}

const pct = (v) => (/%$/.test(String(v)) ? String(v) : `${Number(v)}%`)

/* ------------------------------------------------------------------ *
 * brandbar — partner logo plate for the title slide
 * ------------------------------------------------------------------ */

function brandbar({ attrs, classes, content }) {
  const items = lines(content).map((line) => {
    const [src, height, ...rest] = fields(line)
    const flags = new Set(rest.filter(Boolean))
    const cls = flags.has('invert') ? ' class="invert"' : ''
    return `<img src="${esc(src)}" height="${esc(height || 26)}"${cls} />`
  })
  const sep = attrs.sep === 'none' ? '' : '<span class="brandbar-sep">|</span>'
  return `<div class="${classList('brandbar', classes)}">${items.join(sep)}</div>`
}

/* ------------------------------------------------------------------ *
 * metrics — label/value rows with a dashed rule
 * ------------------------------------------------------------------ */

function metrics({ attrs, classes, content, md, env }) {
  const rows = lines(content).map((line) => {
    let name = line
    let value = ''
    if (line.includes('|')) {
      const [n, ...v] = fields(line)
      name = n
      value = v.join(' | ')
    } else {
      const at = line.lastIndexOf(':')
      if (at > -1) {
        name = line.slice(0, at).trim()
        value = line.slice(at + 1).trim()
      }
    }
    return `<div class="metric"><span class="metric-name">${inline(md, env, name)}</span><span class="metric-value">${inline(md, env, value)}</span></div>`
  })
  const cls = classList('metrics', accentClass(attrs.accent), classes)
  return `<div class="${cls}">${rows.join('')}</div>`
}

/* ------------------------------------------------------------------ *
 * pills — compact chips, e.g. a list of conserved sites
 * ------------------------------------------------------------------ */

function pills({ attrs, classes, content, md, env }) {
  const source = lines(content)
  const items = (source.length === 1 && !source[0].includes('|') ? source[0].split(',') : source).map(
    (line) => {
      const [label, note] = fields(line)
      const tail = note ? ` <em>${inline(md, env, note)}</em>` : ''
      return `<span class="pill">${inline(md, env, label)}${tail}</span>`
    }
  )
  return `<div class="${classList('pills', accentClass(attrs.accent), classes)}">${items.join('')}</div>`
}

/* ------------------------------------------------------------------ *
 * timeline — one or more tracks of positioned event nodes
 * ------------------------------------------------------------------ */

const NODE_SIZES = { lg: 'node-lg', md: 'node-md', sm: 'node-sm', open: 'node-open' }

function timeline({ attrs, classes, content, md, env }) {
  const tracks = []
  let current = null

  const flush = () => {
    if (!current) return
    tracks.push(
      `<div class="${classList('track', accentClass(current.accent || attrs.accent))}">` +
        `<div class="track-header"><div class="track-title">${current.title}</div>` +
        (current.meta ? `<div class="track-meta">${current.meta}</div>` : '') +
        '</div>' +
        `<div class="track-lane">${current.nodes.join('')}</div>` +
        '</div>'
    )
    current = null
  }

  for (const line of lines(content)) {
    const { key, rest } = record(line)
    if (key === 'track') {
      flush()
      const { plain, attrs: a } = takeAttrs(fields(rest))
      current = {
        title: inline(md, env, plain[0] || ''),
        meta: plain[1] ? inline(md, env, plain[1]) : '',
        accent: a.accent,
        nodes: [],
      }
    } else if (key === 'node' || (!key && current)) {
      if (!current) continue
      const { plain, attrs: a, flags } = takeAttrs(fields(key ? rest : line), Object.keys(NODE_SIZES))
      const [x, label, value, note] = plain
      const size = [...flags].map((f) => NODE_SIZES[f]).filter(Boolean)[0] || ''
      const dot = classList('node', size, flags.has('open') ? 'node-open' : '')
      const style = styleAttr({ '--x': pct(x) })
      const info =
        `<div class="node-info">${label ? inline(md, env, label) : ''}` +
        (value ? `<span class="node-value">${inline(md, env, value)}</span>` : '') +
        (note ? `<span class="node-note">${inline(md, env, note)}</span>` : '') +
        '</div>'
      current.nodes.push(
        `<div class="${dot}${a.accent ? ` ${accentClass(a.accent)}` : ''}"${style}><div class="node-dot"></div>${info}</div>`
      )
    }
  }
  flush()

  return `<div class="${classList('timeline', accentClass(attrs.accent), classes)}">${tracks.join('')}</div>`
}

/* ------------------------------------------------------------------ *
 * genemap — proportional gene/protein track with positioned markers
 *
 * Positions are given in real coordinates and converted to percentages
 * against `length=`, so segment boundaries and site markers stay aligned.
 * ------------------------------------------------------------------ */

function genemap({ attrs, classes, content, md, env }) {
  const length = Number(attrs.length || 100)
  const at = (pos) => `${((Number(pos) / length) * 100).toFixed(2)}%`

  const segments = []
  const marks = []
  let ticks = []

  for (const line of lines(content)) {
    const { key, rest } = record(line)

    if (key === 'segment' || key === 'seg') {
      const { plain, attrs: a } = takeAttrs(fields(rest))
      const [label, range, color] = plain
      const [start, end] = String(range || '').split(/\s*[-–]\s*/).map(Number)
      const width = a.w || `${(((end - start + 1) / length) * 100).toFixed(2)}%`
      const title = a.title || label || ''
      segments.push(
        `<div class="gene-segment"${styleAttr({ '--w': width, '--seg': color })}` +
          (title ? ` title="${esc(title)}"` : '') +
          `>${label ? esc(label) : ''}</div>`
      )
    } else if (key === 'mark' || key === 'marker') {
      const { plain, attrs: a, flags } = takeAttrs(fields(rest), ['raise'])
      const [pos, label] = plain
      const cls = classList('gene-marker', flags.has('raise') ? 'gene-marker-raise' : '', accentClass(a.accent))
      marks.push(
        `<div class="${cls}"${styleAttr({ '--x': a.x || at(pos) })}>` +
          `<div class="gene-marker-label">${inline(md, env, label || pos)}</div>` +
          '<div class="gene-marker-line"></div></div>'
      )
    } else if (key === 'ticks' || key === 'axis') {
      ticks = rest
        .split(/[,\s]+/)
        .filter(Boolean)
        .map((t) => `<div class="gene-tick"${styleAttr({ '--x': at(t) })}>${esc(t)}</div>`)
    }
  }

  const cls = classList('genemap', accentClass(attrs.accent), classes)
  return (
    `<div class="${cls}">${marks.join('')}` +
    `<div class="gene-bar">${segments.join('')}</div>` +
    (ticks.length ? `<div class="gene-axis">${ticks.join('')}</div>` : '') +
    '</div>'
  )
}

/* ------------------------------------------------------------------ *
 * motif — a short sequence strip; `[X]` marks the position of interest
 * ------------------------------------------------------------------ */

function motif({ attrs, classes, content }) {
  const seq = lines(content)
    .map((line) => esc(line).replace(/\[([^\]]*)\]/g, '<span class="motif-hit">$1</span>'))
    .map((line) => `<div class="motif-seq">${line}</div>`)
    .join('')
  const label = attrs.label ? `<div class="motif-label">${esc(attrs.label)}</div>` : ''
  return `<div class="${classList('motif', accentClass(attrs.accent), classes)}">${seq}${label}</div>`
}

export const fenceComponents = { brandbar, metrics, pills, timeline, genemap, motif }

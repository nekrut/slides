/**
 * Info-string parsing shared by every deckkit component.
 *
 * Handles the shape used throughout the DSL:
 *
 *   card accent=sky title="Why analyse this?" caps .extra-class
 *
 * -> { name: 'card', attrs: { accent: 'sky', title: '...' },
 *      flags: Set{'caps'}, classes: ['extra-class'] }
 */

const TOKEN = /([.#]?[\w-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s]*)))?/g

export function parseInfo(info = '') {
  const src = String(info).trim()
  const name = (src.split(/\s+/, 1)[0] || '').replace(/^[.#]/, '')
  return { name, ...parseAttrs(src.slice(name.length)) }
}

export function parseAttrs(src = '') {
  const attrs = {}
  const flags = new Set()
  const classes = []
  let m

  TOKEN.lastIndex = 0
  while ((m = TOKEN.exec(String(src))) !== null) {
    const key = m[1]
    const value = m[2] ?? m[3] ?? m[4]

    if (key.startsWith('.')) {
      classes.push(key.slice(1))
    } else if (value === undefined) {
      flags.add(key)
    } else {
      attrs[key] = value
    }
  }

  return { attrs, flags, classes }
}

/** Pull a trailing `{...}` metadata block off a heading / label. */
export function splitTrailingAttrs(text = '') {
  const m = String(text).match(/^([\s\S]*?)\s*\{([^{}]*)\}\s*$/)
  if (!m) return { text: String(text).trim(), ...parseAttrs('') }
  return { text: m[1].trim(), ...parseAttrs(m[2]) }
}

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }

export function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ESC[c])
}

/** Build a class attribute from an accent name plus extra classes. */
export function classList(...parts) {
  const seen = new Set()
  for (const part of parts.flat()) {
    if (!part) continue
    for (const cls of String(part).split(/\s+/)) if (cls) seen.add(cls)
  }
  return [...seen].join(' ')
}

export function accentClass(accent) {
  return accent ? `accent-${String(accent).replace(/^accent-/, '')}` : ''
}

/** Split a `|`-delimited record, trimming each field. */
export function fields(line) {
  return String(line).split('|').map((f) => f.trim())
}

/** Turn `k=v` trailing fields into an attrs object. */
export function tailAttrs(list) {
  return parseAttrs(list.join(' '))
}

export function styleAttr(pairs) {
  const decls = Object.entries(pairs)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}:${v}`)
  return decls.length ? ` style="${esc(decls.join(';'))}"` : ''
}

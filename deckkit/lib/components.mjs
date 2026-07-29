/**
 * Block components — the `::: name` containers.
 *
 * Each component receives the parsed info string plus the already-transformed
 * child tokens, and returns the replacement token list. Raw HTML is injected as
 * `html_block` tokens so the markdown inside a component is still parsed
 * normally (bold, links, lists, tables, nested components).
 *
 * Nesting rule: a container that holds another container must use MORE colons
 * than its child (`::::` around `:::`) — that is how the fence matcher decides
 * where a block ends.
 */

import { accentClass, classList, esc, splitTrailingAttrs, styleAttr } from './attrs.mjs'

/* ------------------------------------------------------------------ *
 * token helpers
 * ------------------------------------------------------------------ */

const html = (Token, content) => {
  const t = new Token('html_block', '', 0)
  t.content = content
  t.block = true
  return t
}

/** Indices of top-level tokens matching `test` (skips nested structures). */
function topLevel(tokens, test) {
  const hits = []
  let depth = 0
  tokens.forEach((t, i) => {
    if (depth === 0 && test(t)) hits.push(i)
    depth += t.nesting
  })
  return hits
}

/* ------------------------------------------------------------------ *
 * card chrome — shared by `::: card` and the auto-split `::: cards`
 * ------------------------------------------------------------------ */

function cardChrome(meta, defaults = {}) {
  const { attrs, flags, classes } = meta
  const accent = attrs.accent || defaults.accent
  const border = attrs.border || defaults.border || 'left'

  const cls = classList(
    'card',
    border === 'none' ? 'card-plain' : `card-${border}`,
    accentClass(accent),
    (attrs.size || defaults.size) && `size-${attrs.size || defaults.size}`,
    flags.has('checks') || defaults.checks ? 'card-checks' : '',
    classes
  )

  const icon = attrs.icon ? `<div class="card-icon">${esc(attrs.icon)}</div>` : ''
  const tag = attrs.tag ? `<div class="card-tag">${esc(attrs.tag)}</div>` : ''
  const titleCls = classList('card-title', flags.has('caps') || defaults.caps ? 'card-title-caps' : '')
  const subtitle = attrs.subtitle ? `<div class="card-subtitle">${esc(attrs.subtitle)}</div>` : ''

  return {
    // everything up to (and including) the opening tag of the title
    head: `<div class="${cls}">${tag}${icon}<div class="${titleCls}">`,
    // closes the title, adds the subtitle, opens the body
    neck: `</div>${subtitle}<div class="card-body">`,
    // closes body + card
    foot: '</div></div>',
    // when there is no title at all
    headless: `<div class="${cls}">${tag}${icon}${subtitle}<div class="card-body">`,
  }
}

/* ------------------------------------------------------------------ *
 * components
 * ------------------------------------------------------------------ */

function cols({ attrs, flags, classes, inner, Token }) {
  const breaks = topLevel(inner, (t) => t.type === 'colbreak')
  const style = {
    '--gap': attrs.gap,
    'grid-template-columns': attrs.ratio,
  }

  const out = []
  if (breaks.length === 0) {
    style['--cols'] = attrs.cols || (attrs.ratio ? undefined : 2)
    const cls = classList('cols', flags.has('top') ? 'cols-top' : '', classes)
    out.push(html(Token, `<div class="${cls}"${styleAttr(style)}>`))
    out.push(...inner)
    out.push(html(Token, '</div>'))
    return out
  }

  const bounds = [0, ...breaks.map((i) => i + 1)]
  const chunks = bounds.map((start, k) => {
    const end = k + 1 < bounds.length ? breaks[k] : inner.length
    return inner.slice(start, end)
  })

  style['--cols'] = attrs.cols || (attrs.ratio ? undefined : chunks.length)
  const cls = classList('cols', flags.has('top') ? 'cols-top' : '', classes)
  out.push(html(Token, `<div class="${cls}"${styleAttr(style)}>`))
  for (const chunk of chunks) {
    out.push(html(Token, '<div class="col">'))
    out.push(...chunk)
    out.push(html(Token, '</div>'))
  }
  out.push(html(Token, '</div>'))
  return out
}

function cards({ attrs, flags, classes, inner, Token }) {
  const defaults = {
    accent: attrs.accent,
    border: attrs.border,
    caps: flags.has('caps'),
    size: attrs.size,
    checks: flags.has('checks'),
  }

  const heads = topLevel(inner, (t) => t.type === 'heading_open' && t.tag === 'h3')
  const style = { '--cols': attrs.cols || 2, '--gap': attrs.gap, 'grid-template-columns': attrs.ratio }
  const out = [html(Token, `<div class="${classList('cards', classes)}"${styleAttr(style)}>`)]

  if (heads.length === 0) {
    out.push(...inner)
    out.push(html(Token, '</div>'))
    return out
  }

  // Everything before the first heading rides along untouched.
  out.push(...inner.slice(0, heads[0]))

  heads.forEach((start, k) => {
    const end = k + 1 < heads.length ? heads[k + 1] : inner.length
    const titleToken = inner[start + 1]
    const meta = splitTrailingAttrs(titleToken?.content ?? '')
    if (titleToken) titleToken.content = meta.text

    const chrome = cardChrome(meta, defaults)
    // heading_open, inline, heading_close -> card head, title, card neck
    out.push(html(Token, chrome.head))
    if (titleToken) out.push(titleToken)
    out.push(html(Token, chrome.neck))
    out.push(...inner.slice(start + 3, end))
    out.push(html(Token, chrome.foot))
  })

  out.push(html(Token, '</div>'))
  return out
}

function card({ attrs, flags, classes, inner, Token }) {
  const chrome = cardChrome({ attrs, flags, classes })
  if (!attrs.title) {
    return [html(Token, chrome.headless), ...inner, html(Token, chrome.foot)]
  }
  return [
    html(Token, `${chrome.head}${esc(attrs.title)}${chrome.neck}`),
    ...inner,
    html(Token, chrome.foot),
  ]
}

function callout({ attrs, flags, classes, inner, Token }) {
  const cls = classList('callout', accentClass(attrs.accent), flags.has('slim') ? 'callout-slim' : '', classes)
  const icon = attrs.icon
    ? /^(https?:|\.|\/)/.test(attrs.icon)
      ? `<img src="${esc(attrs.icon)}"${flags.has('dim') ? ' class="logo-dim"' : ''} />`
      : `<span>${esc(attrs.icon)}</span>`
    : ''
  const title = attrs.title
    ? `<div class="callout-title">${icon}<span>${esc(attrs.title)}</span></div>`
    : ''
  return [
    html(Token, `<div class="${cls}">${title}<div class="callout-body">`),
    ...inner,
    html(Token, '</div></div>'),
  ]
}

function note({ attrs, classes, inner, Token }) {
  const cls = classList('note', accentClass(attrs.accent), classes)
  const title = attrs.title ? `<div class="box-title">${esc(attrs.title)}</div>` : ''
  return [html(Token, `<div class="${cls}">${title}`), ...inner, html(Token, '</div>')]
}

function box({ attrs, classes, inner, Token }) {
  const cls = classList('box', accentClass(attrs.accent), attrs.size && `size-${attrs.size}`, classes)
  const title = attrs.title ? `<div class="box-title">${esc(attrs.title)}</div>` : ''
  return [
    html(Token, `<div class="${cls}">${title}<div class="box-body">`),
    ...inner,
    html(Token, '</div></div>'),
  ]
}

function figure({ attrs, flags, classes, inner, Token }) {
  const cls = classList('figure', flags.has('bare') ? 'figure-bare' : '', classes)
  const style = { '--h': attrs.h || attrs.height }
  const img = attrs.src
    ? `<img src="${esc(attrs.src)}" alt="${esc(attrs.alt || '')}" />`
    : ''
  const out = [html(Token, `<div class="${cls}"${styleAttr(style)}>${img}`)]
  if (inner.length) {
    out.push(html(Token, '<div class="figure-caption">'), ...inner, html(Token, '</div>'))
  }
  out.push(html(Token, '</div>'))
  return out
}

function plain(tag, baseClass) {
  return ({ attrs, classes, inner, Token }) => {
    const cls = classList(baseClass, accentClass(attrs.accent), classes)
    return [html(Token, `<${tag} class="${cls}">`), ...inner, html(Token, `</${tag}>`)]
  }
}

export const components = {
  cols,
  columns: cols,
  grid: cols,
  cards,
  card,
  callout,
  note,
  box,
  figure,
  presenter: plain('div', 'presenter'),
  col: plain('div', 'col'),
  div: plain('div', ''),
}

export const componentNames = Object.keys(components)

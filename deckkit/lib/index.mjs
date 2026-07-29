/**
 * deckkit — a markdown-it plugin turning a content-first markdown file into the
 * deck's HTML component vocabulary.
 *
 * Three authoring surfaces:
 *   ::: name attrs      block components (cards, columns, callouts, figures)
 *   ```name attrs       data components  (metrics, timelines, gene maps)
 *   {{name args}}       inline components (sequence logos)
 *
 * The transform runs after block parsing but before inline parsing, so markdown
 * inside every component is parsed exactly as it would be anywhere else.
 */

import attrsPlugin from 'markdown-it-attrs'
import bracketedSpans from 'markdown-it-bracketed-spans'

import { parseInfo } from './attrs.mjs'
import containerPlugin from './container.mjs'
import { components, componentNames } from './components.mjs'
import { fenceComponents } from './fences.mjs'
import { inlineComponents } from './inline.mjs'

const OPEN_RE = /^container_(.+)_open$/

function transform(tokens, Token, md) {
  const out = []

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    const match = token.nesting === 1 && token.type.match(OPEN_RE)

    if (!match) {
      out.push(token)
      continue
    }

    const name = match[1]
    const closeType = `container_${name}_close`
    let depth = 1
    let end = i + 1
    for (; end < tokens.length; end++) {
      if (tokens[end].type === token.type) depth += 1
      else if (tokens[end].type === closeType && --depth === 0) break
    }

    const inner = transform(tokens.slice(i + 1, end), Token, md)
    const { attrs, flags, classes } = parseInfo(token.info)
    out.push(...components[name]({ attrs, flags, classes, inner, Token, md, name }))
    i = end
  }

  return out
}

export default function deckkit(md) {
  // bracketed-spans first: it turns `[text]{.cls}` into a span for attrs to bind to.
  md.use(bracketedSpans)
  md.use(attrsPlugin, { leftDelimiter: '{', rightDelimiter: '}' })

  md.use(containerPlugin, new Set(componentNames))

  /* `+++` splits a `::: cols` block into columns. */
  md.block.ruler.before('hr', 'colbreak', (state, startLine, _endLine, silent) => {
    const pos = state.bMarks[startLine] + state.tShift[startLine]
    const line = state.src.slice(pos, state.eMarks[startLine]).trim()
    if (!/^\+{3,}$/.test(line)) return false
    if (silent) return true
    state.line = startLine + 1
    const token = state.push('colbreak', '', 0)
    token.map = [startLine, state.line]
    token.hidden = true
    return true
  })
  md.renderer.rules.colbreak = () => ''

  /* Component transform: containers -> HTML wrappers around real markdown. */
  md.core.ruler.after('block', 'deckkit_components', (state) => {
    state.tokens = transform(state.tokens, state.Token, md)
  })

  /* Data components as fenced blocks. */
  const baseFence = md.renderer.rules.fence
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const { name, attrs, flags, classes } = parseInfo(token.info)
    const component = fenceComponents[name]
    if (!component) return baseFence(tokens, idx, options, env, self)
    return component({ attrs, flags, classes, content: token.content, md, env })
  }

  /* Inline components: {{logo A:50 V:50}} */
  md.inline.ruler.push('deckkit_inline', (state, silent) => {
    if (state.src.charCodeAt(state.pos) !== 0x7b /* { */) return false
    if (state.src.charCodeAt(state.pos + 1) !== 0x7b) return false

    const end = state.src.indexOf('}}', state.pos + 2)
    if (end === -1) return false

    const body = state.src.slice(state.pos + 2, end).trim()
    const name = body.split(/\s+/, 1)[0]
    const component = inlineComponents[name]
    if (!component) return false

    if (!silent) {
      const token = state.push('html_inline', '', 0)
      token.content = component(body.slice(name.length).trim())
    }
    state.pos = end + 2
    return true
  })
}

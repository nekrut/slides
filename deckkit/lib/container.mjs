/**
 * Block-container rule for `::: name` components.
 *
 * markdown-it-container closes at the first fence of sufficient length, so
 * nesting there requires each outer container to use more colons than its
 * child. This rule instead tracks open components on a stack, which lets every
 * level use a plain `:::` while still accepting the longer-fence style.
 */

const COLON = 0x3a

/** Count the leading colons on a line, or 0 if it does not start with any. */
function fenceLength(state, line) {
  const start = state.bMarks[line] + state.tShift[line]
  const max = state.eMarks[line]
  if (state.src.charCodeAt(start) !== COLON) return 0
  let pos = start
  while (pos < max && state.src.charCodeAt(pos) === COLON) pos += 1
  return pos - start
}

function fenceInfo(state, line, length) {
  const start = state.bMarks[line] + state.tShift[line]
  return state.src.slice(start + length, state.eMarks[line]).trim()
}

export default function containerPlugin(md, names) {
  const isComponent = (info) => names.has(info.split(/\s+/, 1)[0])

  function container(state, startLine, endLine, silent) {
    const length = fenceLength(state, startLine)
    if (length < 3) return false

    const info = fenceInfo(state, startLine, length)
    if (!info || !isComponent(info)) return false
    if (silent) return true

    // Walk forward, keeping a stack of open fences so a `:::` close binds to
    // the innermost component rather than the outermost.
    const stack = [length]
    let nextLine = startLine
    let autoClosed = false

    for (;;) {
      nextLine += 1
      if (nextLine >= endLine) break

      const start = state.bMarks[nextLine] + state.tShift[nextLine]
      if (start < state.eMarks[nextLine] && state.sCount[nextLine] < state.blkIndent) break
      if (state.sCount[nextLine] - state.blkIndent >= 4) continue

      const len = fenceLength(state, nextLine)
      if (len < 3) continue

      const params = fenceInfo(state, nextLine, len)
      if (params === '') {
        if (len < stack[stack.length - 1]) continue
        stack.pop()
        if (!stack.length) {
          autoClosed = true
          break
        }
      } else if (isComponent(params)) {
        stack.push(len)
      }
    }

    const name = info.split(/\s+/, 1)[0]
    const oldParent = state.parentType
    const oldLineMax = state.lineMax
    state.parentType = 'container'
    state.lineMax = nextLine

    const open = state.push(`container_${name}_open`, 'div', 1)
    open.markup = ':'.repeat(length)
    open.block = true
    open.info = info
    open.map = [startLine, nextLine]

    state.md.block.tokenize(state, startLine + 1, nextLine)

    const close = state.push(`container_${name}_close`, 'div', -1)
    close.markup = ':'.repeat(length)
    close.block = true

    state.parentType = oldParent
    state.lineMax = oldLineMax
    state.line = nextLine + (autoClosed ? 1 : 0)
    return true
  }

  md.block.ruler.before('fence', 'deckkit_container', container, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  })
}

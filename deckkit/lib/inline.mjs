/**
 * Inline components — `{{name args}}`, usable anywhere inline markdown is,
 * including inside table cells.
 */

import { esc } from './attrs.mjs'

const STACK_PX = 34

/**
 * {{logo T:67 L:33}}  — a sequence-logo stack.
 * {{logo T}}          — a single fully conserved residue.
 *
 * Residues without an explicit percentage share whatever is left over.
 */
function logo(args) {
  const parts = args.split(/\s+/).filter(Boolean).map((part) => {
    const [letter, share] = part.split(':')
    return { letter, share: share === undefined ? null : Number(share) }
  })
  if (!parts.length) return ''

  const given = parts.reduce((sum, p) => sum + (p.share ?? 0), 0)
  const blanks = parts.filter((p) => p.share === null).length
  const spare = blanks ? Math.max(0, 100 - given) / blanks : 0

  const letters = parts.map(({ letter, share }) => {
    const h = share ?? spare
    const fs = Math.max(6, Math.min(16, Math.round(16 * Math.sqrt(h / 100)), Math.round(STACK_PX * (h / 100) * 0.95)))
    const cls = `logo-letter aa-${esc(letter.toUpperCase())}`
    return `<span class="${cls}" style="--h:${h}%;--fs:${fs}px">${esc(letter)}</span>`
  })

  return `<span class="logo-stack">${letters.join('')}</span>`
}

export const inlineComponents = { logo }

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import deckkit from './lib/index.mjs'

const here = dirname(fileURLToPath(import.meta.url))

export default {
  allowLocalFiles: true,
  html: true,
  themeSet: [resolve(here, 'themes')],
  engine: ({ marp }) => marp.use(deckkit),
}

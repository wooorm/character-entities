/**
 * @typedef Info
 *   Datum.
 * @property {Array<number>} codepoints
 *   Code points (such as `[120069]`).
 * @property {string} characters
 *   Characters (such as `'\uD835\uDCC8'`).
 *
 * @typedef {Record<string, Info>} Result
 *   Data.
 */

import fs from 'node:fs/promises'
import {fetch} from 'undici'

const own = {}.hasOwnProperty

const response = await fetch('https://html.spec.whatwg.org/entities.json')
const text = await response.text()

/** @type {Result} */
const data = JSON.parse(String(text))
/** @type {Record<string, string>} */
const entities = {}
/** @type {string} */
let key

for (key in data) {
  if (own.call(data, key)) {
    const name = key.slice(
      1,
      key.charAt(key.length - 1) === ';' ? -1 : undefined
    )
    entities[name] = data[key].characters
  }
}

await fs.writeFile(
  'index.js',
  [
    '/**',
    ' * Map of named character references.',
    ' *',
    ' * @type {Record<string, string>}',
    ' */',
    'export const characterEntities = ' +
      JSON.stringify(entities, undefined, 2),
    ''
  ].join('\n')
)

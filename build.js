/**
 * @typedef Info
 * @property {Array<number>} codepoints
 * @property {string} characters
 *
 * @typedef {Record<string, Info>} Result
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
    'export const characterEntities = ' + JSON.stringify(entities, null, 2),
    ''
  ].join('\n')
)

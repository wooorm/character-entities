import fs from 'node:fs'
import https from 'node:https'
import {bail} from 'bail'
import concatStream from 'concat-stream'

const own = {}.hasOwnProperty

https.get('https://html.spec.whatwg.org/entities.json', (response) => {
  response.pipe(concatStream(onconcat)).on('error', bail)
})

/**
 * @param {Buffer} buf
 */
function onconcat(buf) {
  /** @type {Record<string, {codepoints: number[], characters: string}>} */
  const data = JSON.parse(String(buf))
  /** @type {Record<string, string>} */
  const entities = {}
  /** @type {string} */
  let key

  for (key in data) {
    if (own.call(data, key)) {
      entities[key.slice(1, -1)] = data[key].characters
    }
  }

  fs.writeFile(
    'index.js',
    [
      '/**',
      ' * Map of named character references.',
      ' *',
      ' * @type {Record<string, string>}',
      ' */',
      'export const characterEntities = ' + JSON.stringify(entities, null, 2),
      ''
    ].join('\n'),
    bail
  )
}

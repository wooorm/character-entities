import fs from 'node:fs'
import https from 'node:https'
import {bail} from 'bail'
import concat from 'concat-stream'

const own = {}.hasOwnProperty

https.get('https://html.spec.whatwg.org/entities.json', onconnection)

function onconnection(response) {
  response.pipe(concat(onconcat)).on('error', bail)
}

function onconcat(data) {
  const entities = {}
  let key

  data = JSON.parse(data)

  for (key in data) {
    if (own.call(data, key)) {
      entities[key.slice(1, -1)] = data[key].characters
    }
  }

  fs.writeFile(
    'index.js',
    'export const characterEntities = ' +
      JSON.stringify(entities, null, 2) +
      '\n',
    bail
  )
}

import fs from 'fs'
import https from 'https'
import bail from 'bail'
import concat from 'concat-stream'

var own = {}.hasOwnProperty

https.get('https://html.spec.whatwg.org/entities.json', onconnection)

function onconnection(response) {
  response.pipe(concat(onconcat)).on('error', bail)
}

function onconcat(data) {
  var entities = {}
  var key

  data = JSON.parse(data)

  for (key in data) {
    if (own.call(data, key)) {
      entities[key.slice(1, -1)] = data[key].characters
    }
  }

  fs.writeFile(
    'index.js',
    'export var characterEntities = ' +
      JSON.stringify(entities, null, 2) +
      '\n',
    bail
  )
}

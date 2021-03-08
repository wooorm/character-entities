'use strict'

var fs = require('fs')
var https = require('https')
var bail = require('bail')
var concat = require('concat-stream')

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

  data = JSON.stringify(entities, null, 2)

  fs.writeFile('index.json', data + '\n', bail)
}

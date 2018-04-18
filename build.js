'use strict'

var fs = require('fs')
var https = require('https')
var bail = require('bail')
var concat = require('concat-stream')

https.get('https://html.spec.whatwg.org/entities.json', onconnection)

function onconnection(res) {
  res.pipe(concat(onconcat)).on('error', bail)
}

function onconcat(data) {
  var entities = {}

  data = JSON.parse(data)

  Object.keys(data).forEach(function(key) {
    entities[key.slice(1, -1)] = data[key].characters
  })

  data = JSON.stringify(entities, null, 2)

  fs.writeFile('index.json', data + '\n', bail)
}

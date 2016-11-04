'use strict';

var fs = require('fs');
var https = require('https');
var bail = require('bail');
var concat = require('concat-stream');

https.get('https://html.spec.whatwg.org/entities.json', function (res) {
  res
    .pipe(concat(function (data) {
      var entities = {};

      data = JSON.parse(data);

      Object.keys(data).forEach(function (key) {
        entities[key.slice(1, -1)] = data[key].characters;
      });

      data = JSON.stringify(entities, 0, 2);

      fs.writeFile('index.json', data + '\n', bail);
    }))
    .on('error', bail);
});

'use strict';

/* Dependencies. */
var fs = require('fs');
var data = require('./data/entities');

/* Transform. */
var entities = {};
var key;

for (key in data) {
  entities[key.slice(1, -1)] = data[key].characters;
}

/* Write. */
entities = JSON.stringify(entities, 0, 2) + '\n';

fs.writeFileSync('index.json', entities);

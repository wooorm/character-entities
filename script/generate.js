/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module character-entities:script
 * @fileoverview Generate a dictionary of entity names to replacements.
 */

'use strict';

/* eslint-env node */

var fs = require('fs');
var path = require('path');
var data = require('../data/entities');

/*
 * Transform.
 */

var entities = {};
var key;

for (key in data) {
    entities[key.slice(1, -1)] = data[key].characters;
}

/*
 * Write.
 */

entities = JSON.stringify(entities, 0, 2) + '\n';

fs.writeFileSync(path.join(__dirname, '..', 'index.json'), entities);

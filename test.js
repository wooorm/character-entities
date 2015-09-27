/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module character-entities
 * @fileoverview Test suite for `character-entities`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var characterEntities = require('./');

/*
 * Tests.
 */

test('characterEntities', function (t) {
    t.equal(characterEntities.AElig, 'Æ');
    t.equal(characterEntities.aelig, 'æ');
    t.equal(characterEntities.amp, '&');

    t.end();
});

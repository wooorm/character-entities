'use strict';

var test = require('tape');
var characterEntities = require('.');

test('characterEntities', function (t) {
  t.equal(characterEntities.AElig, 'Æ');
  t.equal(characterEntities.aelig, 'æ');
  t.equal(characterEntities.amp, '&');

  t.end();
});

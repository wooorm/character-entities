'use strict';

/* Dependencies. */
var test = require('tape');
var characterEntities = require('./');

/* Tests. */
test('characterEntities', function (t) {
  t.equal(characterEntities.AElig, 'Æ');
  t.equal(characterEntities.aelig, 'æ');
  t.equal(characterEntities.amp, '&');

  t.end();
});

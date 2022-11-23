import assert from 'node:assert/strict'
import test from 'node:test'
import {characterEntities} from './index.js'

test('characterEntities', function () {
  assert.equal(characterEntities.AElig, 'Æ')
  assert.equal(characterEntities.aelig, 'æ')
  assert.equal(characterEntities.amp, '&')
})

import assert from 'node:assert/strict'
import test from 'node:test'
import {characterEntities} from './index.js'

test('characterEntities', async function () {
  assert.deepEqual(
    Object.keys(await import('./index.js')).sort(),
    ['characterEntities'],
    'should expose the public api'
  )

  assert.equal(characterEntities.AElig, 'Æ')
  assert.equal(characterEntities.aelig, 'æ')
  assert.equal(characterEntities.amp, '&')
})

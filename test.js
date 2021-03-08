import test from 'tape'
import {characterEntities} from './index.js'

test('characterEntities', function (t) {
  t.equal(characterEntities.AElig, 'Æ')
  t.equal(characterEntities.aelig, 'æ')
  t.equal(characterEntities.amp, '&')

  t.end()
})

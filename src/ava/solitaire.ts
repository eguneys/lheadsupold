import test from 'ava'

import { Solitaire, SolitairePov } from '../solitaire'
import { _deck } from '../types'


test('index', t => {


  let deck = _deck.slice(0)
  let solitaire = Solitaire.make(deck)


  t.is(solitaire.pov.fen, '0:1c/1:3c/2:6c/3:Tc/4:2h/5:8h/6:2d ///')

  t.is(SolitairePov.from_fen(solitaire.pov.fen).fen, solitaire.pov.fen)


})

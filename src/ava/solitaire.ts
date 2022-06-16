import test from 'ava'

import { Solitaire, SolitairePov } from '../solitaire'
import { _deck } from '../types'

test('user_drop', t => {

  let solitaire = Solitaire.make(_deck.slice(0))

  solitaire.pov.user_apply_drop('p-0@0@p-1')

  t.is(solitaire.pov.fen, '0:/1:3c1c/2:6c/3:Tc/4:2h/5:8h/6:2d ///')
  t.is(solitaire.pov.fen, '0:/1:3c1c/2:6c/3:Tc/4:2h/5:8h/6:2d ///')


  solitaire = Solitaire.make(_deck.slice(0))
  solitaire.pov.user_apply_drop('p-3@3@p-4')
  solitaire.pov.user_apply_drop('p-4@4@p-2')
  solitaire.pov.user_apply_drop('p-2@3@p-1')

  t.is(solitaire.pov.fen, '0:1c/1:3c2hTc/2:6c/3:/4:/5:8h/6:2d ///')

})

test('fen', t => {


  let deck = _deck.slice(0)
  let solitaire = Solitaire.make(deck)


  t.is(solitaire.pov.fen, '0:1c/1:3c/2:6c/3:Tc/4:2h/5:8h/6:2d ///')

  t.is(SolitairePov.from_fen(solitaire.pov.fen).fen, solitaire.pov.fen)


})

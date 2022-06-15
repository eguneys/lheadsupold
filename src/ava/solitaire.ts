import test from 'ava'

import { Solitaire } from '../solitaire'
import { _deck } from '../types'


test('index', t => {


  let deck = _deck.slice(0)
  let solitaire = Solitaire.make(deck)


  t.is(solitaire.fen, ':1c/2c:3c/4c5c:6c/7c8c9c:Tc/JcQcKc1h:2h/3h4h5h6h7h:8h/9hThJhQhKh1d:2d ///')

  t.is(Solitaire.from_fen(solitaire.fen).fen, solitaire.fen)


})

import { card_suit, card_rank, is_card, Pile, Card } from '../types'
import { Solitaire } from '../solitaire'

export function uci_pile(_: string): Pile {
  let res = []
  for (let i = 0; i < _.length; i+=2) {
    let card = _.slice(i, i+2)
    if (is_card(card)) {
      res.push(card)
    }
  }
  return res
}

export function solitaire_fen(solitaire: Solitaire) {
  let piles = solitaire.piles.map(_ => 
                                  _.map(_ => _.join('')).join(':')).join('/')

  let holes = solitaire.holes.map(_ => _.join('')).join('/')

  return [piles, holes].join(' ')
}


export function fen_solitaire(fen: string) {
  let [_piles, _holes] = fen.split(' ')

  let piles = _piles.split('/').map(_ => _.split(':').map(uci_pile) as [Pile, Pile])
  let holes = _holes.split('/').map(uci_pile)

  return new Solitaire(piles, holes)
}

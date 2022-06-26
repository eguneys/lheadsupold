import { card_suit, card_rank, is_card, Pile, Card } from '../types'
import { SolitairePov } from '../solitaire'

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

export function solitaire_fen(solitaire: SolitairePov) {
  let piles = solitaire.piles.map(_ => [_[0], _[1].join('')].join(':')).join('/')
  let holes = solitaire.holes.map(_ => _.join('')).join('/')
  let waste = solitaire.waste.join('')

  return [piles, holes, waste].join(' ')
}


export function fen_solitaire(fen: string) {
  let [_piles, _holes, _waste] = fen.split(' ')

  let piles = _piles.split('/').map(_ => {
    let [nb, pile] = _.split(':')
    return [parseInt(nb), uci_pile(pile)] as [number, Pile]
  })
  let holes = _holes.split('/').map(uci_pile)
  let waste = uci_pile(_waste)

  return new SolitairePov(piles, holes, waste)
}

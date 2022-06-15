import { Pile } from './types'
import { solitaire_fen, fen_solitaire } from './format/fen'

export class Solitaire {

  static from_fen = (fen: string) => {
    return fen_solitaire(fen)
  }

  static make = (_deck: Pile) => {
    let piles = []
    for (let i = 0; i < 7; i++) {
      piles.push([_deck.splice(0, i),
                 _deck.splice(0, 1)] as [Pile, Pile])
    }

    let holes = [[], [], [], []]

    return new Solitaire(piles, holes)
  }


  get fen() {
    return solitaire_fen(this)
  }

  constructor(readonly piles: Array<[Pile, Pile]>,
              readonly holes: Array<Pile>) {
              }


}

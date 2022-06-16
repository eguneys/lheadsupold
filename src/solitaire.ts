import { Pile, card_color } from './types'
import { solitaire_fen, fen_solitaire } from './format/fen'

export class Solitaire {


  static make = (_deck: Pile) => {
    let piles = []
    for (let i = 0; i < 7; i++) {
      piles.push([_deck.splice(0, i),
                 _deck.splice(0, 1)] as [Pile, Pile])
    }

    let holes = [[], [], [], []]

    return new Solitaire(piles, holes)
  }

  get pov() {
    return SolitairePov.from_solitaire(this)
  }

  constructor(readonly piles: Array<[Pile, Pile]>,
              readonly holes: Array<Pile>) {
              }
}


export class SolitairePov {

  static from_fen = (fen: string) => {
    return fen_solitaire(fen)
  }

  static from_solitaire = (solitaire: Solitaire) => {
    let piles = solitaire.piles.map(_ => [_[0].length, _[1]] as [number, Pile])
    let holes = solitaire.holes

    return new SolitairePov(piles, holes)
  }

  get fen() {
    return solitaire_fen(this)
  }

  get stacks() {
    return this.piles.map((_, i) => {
      let cards = [...Array(_[0]).keys()].map(_ => 'zz').join('') + _[1]
      return [`p-${i}`, cards].join('@')
    })
  }

  get drags() {
    return this.piles.map((_, o_stack_i) => {
      let back = _[0]
      let fronts = _[1]


      return [`p-${o_stack_i}`, fronts.length].join('@')
    })

  }


  get drops() {
    return this.piles.flatMap((o_stack, o_stack_i) => {
      let [back, fronts] = o_stack

      return fronts.flatMap((_, f_i) => {
        let o_i = back + f_i
        return this.piles
        .map((drop_stack, drop_stack_i) => {
          if (can_drop_piles(o_stack, f_i, drop_stack)) {
            return [`p-${o_stack_i}`, o_i, `p-${drop_stack_i}`].join('@')
          }
        }).filter(Boolean)
      })
    })
  }

  constructor(readonly piles: Array<[number, Pile]>, readonly holes: Array<Pile>) {}

}


function can_drop_piles(o_stack: [number, Pile], f_i: number, drop_stack: [number, Pile]) {
  let [back, fronts] = o_stack
  let card = fronts[f_i]
  let drop_on_card = drop_stack[1].slice(-1)[0]

  return card_color(card) !== card_color(drop_on_card)
}

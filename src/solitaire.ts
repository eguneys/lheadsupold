import { Card, Pile, card_color } from './types'
import { solitaire_fen, fen_solitaire } from './format/fen'

export type DropRule = string

export interface DropRuleHooks {
  cut_o_pile: (o_stack_i: number, o_i: number) => Pile,
  cut_o_hole: (o_stack_i: number, o_i: number) => Pile,
  drop_o_pile: (stack: Pile, drop_stack_i: number) => void,
  drop_o_hole: (stack: Pile, drop_stack_i: number) => void
}

export function call_drop_rule_hooks(hooks: DropRuleHooks) {
  return (rule: DropRule) => {
    let [_o_name, _o_i, _drop_name] = rule.split('@')
    let [_, _o_stack_i] = _o_name.split('-')
    let [_drop_stack_type, _drop_stack_i] = _drop_name.split('-')

    let o_i = parseInt(_o_i),
      drop_stack_i = parseInt(_drop_stack_i),
      o_stack_i = parseInt(_o_stack_i)

    let stack: Pile | undefined = undefined

    if (_o_name[0] === 'p') {
      stack = hooks.cut_o_pile(o_stack_i, o_i)
    } else if (_o_name[0] === 'h') {
      stack = hooks.cut_o_hole(o_stack_i, o_i)
    }

    if (stack) {
      if (_drop_stack_type[0] === 'p') {
        hooks.drop_o_pile(stack, drop_stack_i)
      } else if (_drop_stack_type[0] === 'h') {
        hooks.drop_o_hole(stack, drop_stack_i)
      }
    }
  }
}

export class Solitaire implements DropRuleHooks {


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

  cut_o_pile(o_stack_i: number, o_i: number) {
    let [o_backs, o_pile] = this.piles[o_stack_i]
    let o_f = o_i - o_backs.length

    let res = o_pile.splice(o_f)
    if (o_pile.length === 0 && o_backs.length > 0) {
      let reveal_card = o_backs.pop()!
      o_pile.push(reveal_card)
    }

    return res
  }

  cut_o_hole(o_stack_i: number, o_i: number) {
    let o_hole = this.holes[o_stack_i]

    return o_hole.splice(o_i)
  }

  drop_o_pile(cards: Pile, drop_stack_i: number) {
    let drop_pile = this.piles[drop_stack_i][1]
    drop_pile.push(...cards)
  }

  drop_o_hole(cards: Pile, drop_stack_i: number) {
    let drop_hole = this.holes[drop_stack_i]
    drop_hole.push(...cards)
  }

  apply_drop: (rule: DropRule) => void

  constructor(readonly piles: Array<[Pile, Pile]>,
              readonly holes: Array<Pile>) {
                this.apply_drop = call_drop_rule_hooks(this)
              }
}


export class SolitairePov implements DropRuleHooks {

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
    let piles = this.piles.map((_, i) => {
      let cards = [...Array(_[0]).keys()].map(_ => 'zz').join('') + _[1].join('')
      return [`p-${i}`, cards].join('@')
    })

    let holes = this.holes.map((_, i) => {
      let cards = _.join('')
      return [`h-${i}`, cards].join('@')
    })
    return [...piles, ...holes]
  }

  get drags() {
    let piles = this.piles.map((_, o_stack_i) => {
      let back = _[0]
      let fronts = _[1]
      return [`p-${o_stack_i}`, fronts.length].join('@')
    })

    let holes = this.holes.map((_, o_stack_i) => {
      return [`h-${o_stack_i}`, 1].join('@')
    })

    return [...piles, ...holes]
  }


  get drops() {
    let piles = this.piles.flatMap((o_stack, o_stack_i) => {
      let [back, fronts] = o_stack

      let _piles = fronts.flatMap((_, f_i) => {
        let o_i = back + f_i
        return this.piles
        .map((drop_stack, drop_stack_i) => {
          if (can_drop_piles(o_stack, f_i, drop_stack)) {
            return [`p-${o_stack_i}`, o_i, `p-${drop_stack_i}`].join('@')
          }
        }).filter(Boolean)
      })

      let _holes = this.holes.map((_, drop_stack_i) => {
        let front = fronts.slice(-1)[0]
        let o_i = back + fronts.length - 1

        if (front && can_drop_pile_hole(_, front)) {
          return [`p-${o_stack_i}`, o_i, `h-${drop_stack_i}`].join('@')
        }
      }).filter(Boolean)

      return [..._piles, ..._holes]
    })

    let holes = this.holes.flatMap((o_stack, o_stack_i) => {
      return this.piles
      .map((drop_stack, drop_stack_i) => {
        if (can_drop_hole_pile(o_stack, drop_stack)) {
          return [`h-${o_stack_i}`, o_stack.length - 1, `p-${drop_stack_i}`].join('@')
        }
      }).filter(Boolean)
    })

    return [
      ...piles,
      ...holes
    ]
  }


  get reveals() {
    return this.piles.map((o_stack, o_stack_i) => {
      let [back, fronts] = o_stack

      if (fronts.length === 0 && back > 0) {
        return [`p-${o_stack_i}`, back - 1].join('@')
      }
    }).filter(Boolean)
  }

  cut_o_pile(o_stack_i: number, o_i: number) {
    let [o_backs, o_pile] = this.piles[o_stack_i]
    let o_f = o_i - o_backs

    let res = o_pile.splice(o_f)

    return res
  }

  cut_o_hole(o_stack_i: number, o_i: number) {
    let o_hole = this.holes[o_stack_i]

    return o_hole.splice(o_i)
  }

  drop_o_pile(cards: Pile, drop_stack_i: number) {
    let drop_pile = this.piles[drop_stack_i][1]
    drop_pile.push(...cards)
  }

  drop_o_hole(cards: Pile, drop_stack_i: number) {
    let drop_hole = this.holes[drop_stack_i]
    drop_hole.push(...cards)
  }



  apply_drop: (rule: DropRule) => void

  constructor(readonly piles: Array<[number, Pile]>, readonly holes: Array<Pile>) {
              this.apply_drop = call_drop_rule_hooks(this)
  }

}

function can_drop_pile_hole(o_hole: Pile, front: Card) {
  return true
}

function can_drop_hole_pile(o_hole: Pile, drop_stack: [number, Pile]) {
  let card = o_hole.slice(-1)[0]

  if (!card) { return false }

  let [drop_back, drop_fronts] = drop_stack
  let drop_on_card = drop_fronts.slice(-1)[0]

  if (!drop_on_card) {
    return false
  }

  return card_color(card) !== card_color(drop_on_card)
}


function can_drop_piles(o_stack: [number, Pile], f_i: number, drop_stack: [number, Pile]) {
  let [back, fronts] = o_stack
  let card = fronts[f_i]
  let [drop_back, drop_fronts] = drop_stack
  let drop_on_card = drop_fronts.slice(-1)[0]

  if (!drop_on_card) {
    if (drop_back === 0) {
      return true
    }
    return false
  }

  return card_color(card) !== card_color(drop_on_card)
}

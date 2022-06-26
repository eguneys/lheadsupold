export type Chips = number

export class HeadsupRound {

  constructor(
    readonly stacks: Array<Chips>,
    readonly round_bets: Array<Chips>,
    readonly pots: Array<Chips>,
    readonly pots_involved: Array<Array<number>>
  ) {}

  get head_pot() {
    return this.pots[this.pots.length - 1]
  }

  get head_pot_involved() {
    return this.pots_involved[this.pots_involved.length - 1]
  }

  get _over() {
    return false
  }


  _bet(stack_i: number, chips: Chips) {
    this.stacks[stack_i] -= chips
    this.round_bets[stack_i] += chips
  }


  _share(hands: Array<number>) {
  }
}

export type Suit = 'c' | 'h' | 'd' | 's'
export type Rank = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K'

export type Card = string

export type Pile = Array<Card>

export function card(suit: Suit, rank: Rank) { return rank + suit }
export function card_suit(card: Card) { return card[1] }
export function card_rank(card: Card) { return card[0] }

export const suits: Array<Suit> = ['c','h','d','s'] as Array<Suit>
export const ranks: Array<Rank> = ['1','2','3','4','5','6','7','8','9','T','J','Q','K'] as Array<Rank>

export function is_suit(_: string): _ is Suit { return suits.indexOf(_ as Suit) > -1 }
export function is_rank(_: string): _ is Rank { return ranks.indexOf(_ as Rank) > - 1}
export function is_card(_: string): _ is Card { return _.length === 2 && is_rank(_[0]) && is_suit(_[1]) }

export const _deck: Pile = suits.flatMap(suit => ranks.map(rank => card(suit, rank)))
export const _deck2: Pile = [...Array(2).keys()].flatMap(_ => _deck.slice(0))
export const _deck4: Pile = [...Array(4).keys()].flatMap(_ => _deck.slice(0))

export const shuffled = (deck: Pile) => shuffleArray(deck)

export function shuffleArray(array: Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

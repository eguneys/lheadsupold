A side pot is created when one player goes all-in there are at least two other players remaining in the hand. The initial pot is frozen with all remaining players contributing the same amount as the all-in player. Any additional money bet by the two or more remaining players goes into a side pot.

The all-in player remains in the initial frozen pot, and does not have to contribute any more money. But the remaining players lose all stake in initial and side pot if they fold.

At the end of the hand, the initial pot is awarded to the player with the best hand among the all-in player and all remaining other players. The side pot is awarded to the best hand among the remaining players, not including the all-in player.

For example, suppose there is $1,000 in the pot preflop, with three players remaining in the hand, A with a stack of $10,000 and B and C with stacks of $20,000. A goes all-in on the flop, B raises to $20,000 and C calls. A does not have to call because she is all-in. The initial pot is $1,000, plus A’s $10,000 bet, plus B’s and C’s calls of that $10,000; for $31,000 total. The side pot is $20,000. Since all remaining players are now all-in, the betting is over.

The turn and river are dealt. The best hand among A, B and C takes the $31,000 initial pot. The best hand between B and C takes the $20,000 side pot.

Things can get more complicated with multiple side pots and tied hands, also in forms of poker other than Texas Hold’em that have different rules for awarding the pot. But that’s the basic idea.





### Quora

“What are some algorithms for handling side pots in Texas Hold 'Em?”

Calling this an ‘algorithm’ feels a touch overstated, but I guess it technically qualifies. Let’s set the action here:

$100 in the pot preflop.

Player 1 bets $50.

Player 2 goes all-in for $137 total.

Player 3 goes all-in for $220 total.

Everyone folds back to Player 1.

Player 1 calls all-in for $96 total.

All three players put in at least $96, so you take that amount from each stack and put it into the main pot. $100 + $96*3 = $388, and all 3 players are eligible.

Player 2 was all-in for $137-$96=$41 more than Player 1, and Player 3 was all-in for more than that. $41 from each player goes into the side pot, and the additional portion of Player 3’s all-in is returned (as nobody called that much). There is $82 in the side pot, and only Players 2 and 3 are eligible.

This model is basically how dealers do this in live games, and is the most straightforward way to handle it. Take the amount that everyone has put it in out of each stack and put that in the middle. Then take the amount that the next largest amount of players has put in, and that’s the (first) side pot. Repeat as necessary until you’re down to just one player with chips in play, and return those uncalled chips.

import test from 'ava'
import { HeadsupRound } from '../headsup'


test('side pots', t => {



  let round = new HeadsupRound(
    [10000, 20000, 20000],
    [0, 0, 0],
    [1000],
    [[0, 1, 2]])

    round._bet(0, 10000)
    round._bet(1, 20000)
    round._bet(2, 20000)

    
    t.is(round._over, true)


    t.deepEqual(round._share([0, 1, 2]),
                [31000, 20000, 0])

})

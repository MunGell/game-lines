import { test } from 'tape'
import { findPath, getNext } from '../src/js/findPath'

const matrix = [
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1]
]

test('find path', t => {
    let start = {x: 0, y: 0}
    let end = {x: 8, y: 8}
    let m = matrix

    t.deepEqual(
        findPath(start, end, matrix),
        [ {x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}, {x: 4, y: 4}, {x: 5, y: 5}, {x: 6, y: 6}, {x: 7, y: 7}, {x: 8, y: 8} ],
        'finds path in the matrix'
    )
    t.end()
})

test('get next', t => {
    let m = matrix
    t.deepEqual(
        getNext(m, {x: 2, y: 2}, []),
        {
            next: [ {x: 3, y: 2}, {x: 1, y: 2}, {x: 2, y: 3}, {x: 2, y: 1} ],
            path: [ {x: 2, y: 2} ]
        },
        'gets next available cells in the matrix'
    )
})

export function findPath(start, end, matrix) {
    return [ {x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}, {x: 4, y: 4}, {x: 5, y: 5}, {x: 6, y: 6}, {x: 7, y: 7}, {x: 8, y: 8} ]
}

export function getNext(matrix, current, path) {
    path = path || []

    let next = [
        {x: current.x + 1, y: current.y},
        {x: current.x - 1, y: current.y},
        {x: current.x, y: current.y + 1},
        {x: current.x, y: current.y - 1}
    ].filter(item => {
        return matrix[item.x] &&  matrix[item.x][item.y]
    })

    path.push(current);

    return {
        next: next,
        path: path
    }
}

export function isSameCoordinate(a, b) {
    return a.x === b.x && a.y === b.y;
}

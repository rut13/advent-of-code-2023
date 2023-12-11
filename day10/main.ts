import * as fs from "fs";

const input = fs.readFileSync("./day10/input2.txt", "utf8");
const rows = input.split("\n");

enum Direction {
    North = 0,
    East = 1,
    South = 2,
    West = 3
}

const directionMap: { [key: string]: Direction[] } = {
    'S': [Direction.South, Direction.West, Direction.North, Direction.East],
    '|': [Direction.South, Direction.North],
    '-': [Direction.West, Direction.East],
    'L': [Direction.North, Direction.East],
    'J': [Direction.North, Direction.West],
    'F': [Direction.South, Direction.East],
    '7': [Direction.South, Direction.West],
    '.': []
};

class Point {
    x: number;
    y: number;
    connections: Direction[];
    char: string;
    constructor(x: number, y: number, connections: Direction[], char: string) {
        this.x = x
        this.y = y
        this.connections = connections
        this.char = char
    }
}

const points: Point[] = []
rows.forEach((row, rIndex) => {
    row.split('').forEach((char, cIndex) => {
        points.push(new Point(rIndex, cIndex, directionMap[char], char))
    })
})

function getMainTube(points: Point[]) {
    const start = points.find(p => p.char === 'S')!
    const lengths: number[] = []
    start.connections.forEach(direction => {
        lengths.push(followTube(start, direction))
    })

    return Math.max(...lengths)
}

function followTube( start: Point, direction: Direction) {
    let currentPoint = start
    let moves = 0
    while (getNextPoint(currentPoint, direction)) {
        moves++
    }
    return moves
}

function getNextPoint(currentPoint: Point, direction: Direction) {
    const nextPoint = points.find(p => p.x === currentPoint.x && p.y === currentPoint.y && p.connections.includes(direction))
    if (nextPoint) {
        return nextPoint
    }
    return null
}

const max = getMainTube(points)
console.log(max);


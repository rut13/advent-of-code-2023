import * as fs from 'fs'

const input = fs.readFileSync('./day2/input.txt', 'utf8')
const lines = input.split('\n')

// part 1

// let gameIdSum = 0
// const maxRed = 12
// const maxGreen = 13
// const maxBlue = 14

// lines.forEach(line => {
//     const game = line.split(':')
//     const gameId = +game[0].match(/\d+/)![0]
//     const sets = game[1].split(';')
//     let valid = true
//     for (const set of sets) {
//         const colors = set.split(',')
//         const red = +(colors.find(color => color.includes('red'))?.match(/\d+/)?.[0] ?? 0)
//         const green = +(colors.find(color => color.includes('green'))?.match(/\d+/)?.[0] ?? 0)
//         const blue = +(colors.find(color => color.includes('blue'))?.match(/\d+/)?.[0] ?? 0)
//         if (red > maxRed || green > maxGreen || blue > maxBlue) {
//             valid = false
//             break
//         }
//     }
//     if (valid) {
//         gameIdSum += gameId
//     }
// })

// console.log(gameIdSum);

// part 2

let cubesPowSum = 0

lines.forEach(line => {
    const game = line.split(':')
    const sets = game[1].split(';')
    let maxBlue = 0
    let maxRed = 0
    let maxGreen = 0
    for (const set of sets) {
        const colors = set.split(',')
        const red = +(colors.find(color => color.includes('red'))?.match(/\d+/)?.[0] ?? 0)
        const green = +(colors.find(color => color.includes('green'))?.match(/\d+/)?.[0] ?? 0)
        const blue = +(colors.find(color => color.includes('blue'))?.match(/\d+/)?.[0] ?? 0)
        if (red > maxRed) {
            maxRed = red
        }
        if (green > maxGreen) {
            maxGreen = green
        }
        if (blue > maxBlue) {
            maxBlue = blue
        }
    }
    cubesPowSum += maxRed * maxGreen * maxBlue
})

console.log(cubesPowSum)
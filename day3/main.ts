import * as fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf8')
const lines = input.split('\n')


// part 1
// function isAdjacentToSpecial(index: number, current: string, above?: string, below?: string) {
//     let charsToCheck = [current[index - 1], current[index + 1]]
//     if (above) {
//         charsToCheck.push(above[index - 1], above[index], above[index + 1])
//     }
//     if (below) {
//         charsToCheck.push(below[index - 1], below[index], below[index + 1])
//     }

//     let isAdjacent = false
//     charsToCheck.forEach(char => {
//         if (char && !char.match(/\d|\./)) {
//             console.log(`char ${char} adjacent`);
//             isAdjacent = true
//             return
//         }
//     })
//     return isAdjacent
// }

// let sum = 0
// for (let i = 0; i < lines.length; ++i) {
//     const line = lines[i]
//     console.log(line);
//     let adjacent = false
//     let curNumber = ''
//     for (let j = 0; j < line.length; ++j) {
//         const curChar = line[j]
//         if (Number.isInteger(+curChar)) {
//             curNumber += curChar
//             if (!adjacent) {
//                 adjacent = isAdjacentToSpecial(j, line, lines[i - 1], lines[i + 1])
//             }
//             if (j + 1 === line.length && adjacent && curNumber !== '') {
//                 sum += +curNumber
//             }
//         } else {
//             if (adjacent && curNumber !== '') {
//                 sum += +curNumber
//                 adjacent = false
//             }
//             curNumber = ''
//         }
//     }
// }

// console.log(sum)

// part 2

// function getAdjacentNumber(index: number, line: string, currentNumber?: string) {
//     const char = line[index]
//     if (char && Number.isInteger(+char)) {

//     }
//     return currentNumber
// }

// function getGearRatio(index: number, current: string, above?: string, below?: string) {
//     const match = current.match(/\d+/g)
//     let matchingNumbers = []
//     let charsToCheck = [current[index - 1], current[index + 1]]
//     const left = getAdjacentNumber(index - 1, -1, current)
//     if (left) {

//     }

//     return 0
// }

// let sum = 0
// for (let i = 0; i < lines.length; ++i) {
//     const line = lines[i]
//     console.log(line);
//     let adjacent = false
//     let curNumber = ''
//     for (let j = 0; j < line.length; ++j) {
//         const curChar = line[j]
//         if (curChar === '*') {
//             sum += getGearRatio(j, line, lines[i - 1], lines[i + 1])
//         }
//     }
// }

// console.log(sum);

function findAdjacentNumbers(x: number, y: number, pos: Set<string>) {
    const partNumbers = []
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (!(dx === 0 && dy === 0)) {
          const nx = x + dx
          const ny = y + dy
          if (
            nx >= 0 &&
            nx < lines[0].length &&
            ny >= 0 &&
            ny < lines.length &&
            Number.isInteger(lines[ny][nx])
          ) {
            let numStart = nx
            while (numStart > 0 && Number.isInteger(+lines[ny][numStart - 1])) {
              numStart--
            }
  
            const positionKey = `${ny},${numStart}`
            if (!pos.has(positionKey)) {
              const match = lines[ny].substring(numStart).match(/^\d+/)
              if (match) {
                partNumbers.push(+match[0])
                pos.add(positionKey)
              }
            }
          }
        }
      }
    }
  
    return partNumbers
  }
  
  const sum: number = lines.reduce((total, line, y) => {
    const pos = new Set<string>()
    return (
      total +
      line.split('').reduce((acc, char, x) => {
        if (char === '*') {
          const adjacentNumbers = findAdjacentNumbers(x, y, pos)
          if (adjacentNumbers.length === 2) {
            return acc + adjacentNumbers[0] * adjacentNumbers[1]
          }
        }
        return acc
      }, 0)
    )
  }, 0)
  
console.log(sum)
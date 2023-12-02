import * as fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf8')
const lines = input.split('\n')

let sum = 0
const numberMap: { [key: string]: number[] } = {
    one: [1],
    two: [2],
    three: [3],
    four: [4],
    five: [5],
    six: [6],
    seven: [7],
    eight: [8],
    nine: [9],
    oneight: [1, 8],
    twone: [2, 1],
    threeight: [3, 8],
    fiveight: [5, 8],
    eightwo: [8, 2],
    eighthree: [8, 3],
    nineight: [9, 8],
  };

lines.forEach(line => {    
    const numbers = line.match(/\d|oneight|twone|threeight|fiveight|eightwo|eighthree|nineight|one|two|three|four|five|six|seven|eight|nine/gi);
    console.log(`line: ${line}, numbers: ${numbers}`);
    
    if (numbers && numbers.length > 0) {
        const lastIndex = numbers.length - 1
        const first = Number.isInteger(parseInt(numbers[0])) ? +numbers[0] : numberMap[numbers[0]][0]
        const last = Number.isInteger(parseInt(numbers[lastIndex])) ? +numbers[lastIndex] : numberMap[numbers[lastIndex]][numberMap[numbers[lastIndex]].length - 1]
        console.log(`first: ${first}, last: ${last}`);
        
        sum += parseInt(`${first}${last}`)
    }
})

console.log(sum)
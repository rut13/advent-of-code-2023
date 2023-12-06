import * as fs from 'fs'

const input = fs.readFileSync('./day6/input.txt', 'utf8');
const lines = input.split('\n');

// part 1
// const times = lines[0].match(/\d+/g)!.map(Number)
// const distances = lines[1].match(/\d+/g)!.map(Number)

// let possibilities: number[] = []
// for (let i = 0; i < times.length; ++i) {
//     const time = times[i]
//     const distance = distances[i]
//     let posCounter = 0

//     for (let timePressed = 0; timePressed <= time; ++timePressed) {
//         const myDistance = (time - timePressed) * timePressed
//         if (myDistance > distance) {
//             ++posCounter
//         }
//     }
//     possibilities.push(posCounter)
//     console.log(posCounter);
    
// }

// console.log(possibilities);

// let posTimes = 1
// possibilities.forEach(pos => posTimes *= pos)
// console.log(posTimes);


// part 2

let rawTime = ""
let rawDistance = ""
lines[0].match(/\d+/g)!.forEach(line => rawTime += line)
lines[1].match(/\d+/g)!.forEach(line => rawDistance += line)

let posCounter = 0

const time = +rawTime
const distance = +rawDistance

for (let timePressed = 0; timePressed <= time; ++timePressed) {
    const myDistance = (time - timePressed) * timePressed
    if (myDistance > distance) {
        ++posCounter
    }
}
console.log(posCounter);
import * as fs from 'fs'

const input = fs.readFileSync('./day7/input.txt', 'utf8');
const lines = input.split('\n');

// part 1

// const cardMap: { [key: string]: number } = {
//     '2': 1,
//     '3': 2,
//     '4': 3,
//     '5': 4,
//     '6': 5,
//     '7': 6,
//     '8': 7,
//     '9': 8,
//     'T': 9,
//     'J': 10,
//     'Q': 11,
//     'K': 12,
//     'A': 13
//   };

class CardResult {
    cardValues!: number[]
    value!: number
    bet!: number
}

// function getPointsByHand(hand: string, bet: number) {
//     const cardValues: number[] = []
//     let map: any = {} 
//     hand.split('').forEach(card => {
//         cardValues.push(cardMap[card])
//         if (map[card]) {
//             map[card]++
//         } else {
//             map[card] = 1
//         }
//     })
//     let highestValue = 0
//     const amountValues: number[] = []
//     for (const key in map) {
//         if (map.hasOwnProperty(key)) {
//             amountValues.push(map[key])
//         }
//     }

//     if (amountValues.includes(5)) {
//         highestValue = 7
//     }
//     else if (amountValues.includes(4)) {
//         highestValue = 6
//     }
//     else if (amountValues.includes(3) && amountValues.includes(2)) {
//         highestValue = 5
//     }
//     else if (amountValues.includes(3)) {
//         highestValue = 4
//     }
//     else {
//         const twoPair = amountValues.filter(value => value === 2).length === 2
//         if (twoPair) {
//             highestValue = 3
//         }
//         else if (amountValues.includes(2)) {
//             highestValue = 2
//         } else {
//             highestValue = 1
//         }
//     }

//     return {
//         cardValues,
//         value: highestValue,
//         bet
//     } as CardResult

// }

// const results: CardResult[] = []

// lines.forEach(line => {
//     const seperated = line.split(' ')
//     const hand = seperated[0]
//     const bet = seperated[1]
//     results.push(getPointsByHand(hand, +bet))
// })

// const sorted = results.sort((a, b) => { 
//     if(a.value > b.value) return -1
//     else if (a.value < b.value) return 1
//     else {
//         for (let i = 0; i < a.cardValues.length; ++i) {
//             const element = a.cardValues[i];
//             if (element > b.cardValues[i]) return -1
//             else if (element < b.cardValues[i]) return 1
//         }
//     }
//     return 0
// })

// let betSum = 0
// for (let i = sorted.length, j = 0; j < sorted.length; --i, ++j) {
//     const element = sorted[j];
//     betSum += element.bet * i
// }

// console.log(betSum);


const cardMap: { [key: string]: number } = {
    '2': 1,
    '3': 2,
    '4': 3,
    '5': 4,
    '6': 5,
    '7': 6,
    '8': 7,
    '9': 8,
    'T': 9,
    'J': 0,
    'Q': 11,
    'K': 12,
    'A': 13
  };

function getPointsByHand(hand: string, bet: number) {
    const cardValues: number[] = []
    let jokerCount = 0
    let map: any = {} 
    hand.split('')
    .forEach(card => {
        cardValues.push(cardMap[card])
        if(card === 'J') jokerCount++
        else if (map[card]) {
            map[card]++
        } else {
            map[card] = 1
        }
    })
    let highestValue = 0
    let amountValues: number[] = []
    
    for (const key in map) {
        if (map.hasOwnProperty(key)) {
            amountValues.push(map[key])
        }
    }
    let highestIndex = amountValues.indexOf(Math.max(...amountValues))
    amountValues[highestIndex] += jokerCount

    if (amountValues.includes(5) || jokerCount === 5) {
        highestValue = 7
    }
    else if (amountValues.includes(4)) {
        highestValue = 6
    }
    else if (amountValues.includes(3) && amountValues.includes(2)) {
        highestValue = 5
    }
    else if (amountValues.includes(3)) {
        highestValue = 4
    }
    else {
        const twoPair = amountValues.filter(value => value === 2).length === 2
        if (twoPair) {
            highestValue = 3
        }
        else if (amountValues.includes(2)) {
            highestValue = 2
        } else {
            highestValue = 1
        }
    }

    return {
        cardValues,
        value: highestValue,
        bet
    } as CardResult

}

const results: CardResult[] = []

lines.forEach(line => {
    const seperated = line.split(' ')
    const hand = seperated[0]
    const bet = seperated[1]
    results.push(getPointsByHand(hand, +bet))
})

const sorted = results.sort((a, b) => { 
    if(a.value > b.value) return -1
    else if (a.value < b.value) return 1
    else {
        for (let i = 0; i < a.cardValues.length; ++i) {
            const element = a.cardValues[i];
            if (element > b.cardValues[i]) return -1
            else if (element < b.cardValues[i]) return 1
        }
    }
    return 0
})

let betSum = 0
for (let i = sorted.length, j = 0; j < sorted.length; --i, ++j) {
    const element = sorted[j];
    
    betSum += element.bet * i
}

console.log(betSum);

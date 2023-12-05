import * as fs from 'fs'

const input = fs.readFileSync('./day4/input.txt', 'utf8')
const lines = input.split('\n')
// part 1

// let pointsSum = 0

// lines.forEach(line => {
//     const seperated = line.split('|')
//     const titleSeperated = seperated[0].split(':')
//     const winningNumbers = titleSeperated[1].match(/\d+/g)!
//     const cardNumbers = seperated[1].match(/\d+/g)!
    
//     let points = 0
//     cardNumbers.forEach(cardNumber => {
//         if (winningNumbers.includes(cardNumber)) {
//             if (points === 0) {
//                 points = 1
//             } else {
//                 points *= 2
//             }
//         }
//     })
//     pointsSum += points
// })

// console.log(pointsSum)

// part 2

function getCardByNumber(index: number) {
    const reg = new RegExp(`\\b${index}\\b\:`, "gi")
    return lines.find(line => line.match(reg))!
}

function checkCards(cards: string[]) {
    let cardSum = 0
    let cardsToCheck: string[] = []
    cards.forEach(line => {
        const seperated = line.split('|')
        const titleSeperated = seperated[0].split(':')
        const cardNumber = +titleSeperated[0].match(/\d+/)?.[0]!
        const winningNumbers = titleSeperated[1].match(/\d+/g)!
        const cardNumbers = seperated[1].match(/\d+/g)!
        
        let cards = 0
        cardNumbers.forEach(cardNumber => {
            if (winningNumbers.includes(cardNumber)) {
                ++cards
            }
        })
        while (cards > 0) {
            cardsToCheck.push(getCardByNumber(cardNumber + cards))
            --cards
        }
        ++cardSum
    })
    if (cardsToCheck.length > 0) {
        cardSum += checkCards(cardsToCheck)
    }
    return cardSum
}

console.log(checkCards(lines))
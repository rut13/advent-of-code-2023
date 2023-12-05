import * as fs from 'fs'

const input = fs.readFileSync('./day5/input.txt', 'utf8');
const lines = input.split('\n');

const mapNames = ['seed-to-soil', 'soil-to-fertilizer', 'fertilizer-to-water', 'water-to-light', 'light-to-temperature', 'temperature-to-humidity', 'humidity-to-location'];

let maps: number[][][] = []

for (let i = 0; i < mapNames.length; ++i) {
    maps.push(lines.slice(lines.findIndex(line => line.includes(mapNames[i])) + 1, i + 1 !== mapNames.length ? lines.findIndex(line => line.includes(mapNames[i + 1])) - 1 : undefined).map(line => line.split(' ').map(Number)))
}

function getLocationNumbers(seeds: number[]) {
    // console.log(maps);
    let locationNumbers: number[] = []
    seeds.forEach(seed => {
        let currentNumber = seed
        maps.forEach(map => {
            let found = false
            map.forEach(mapLine => {
                if (!found) {                
                    if (currentNumber >= mapLine[1] && currentNumber < mapLine[1] + mapLine[2]) {
                        const diff = currentNumber - mapLine[1]
                        currentNumber = mapLine[0] + diff
                        found = true
                    }
                }
            })
        })
        locationNumbers.push(currentNumber)
    });
return locationNumbers;
}

// part 1

// const seeds = lines[0].split(': ')[1].split(' ').map(Number);
// // console.log(seeds);

// const result = getLocationNumbers(seeds);

// console.log(result);
// console.log(Math.min(...result))

// part 2

const seedsRaw = lines[0].split(': ')[1].split(' ');
const seedPairs: number[][] = [];
let elemCounter = 0
for (let i = 0; i < seedsRaw.length; i += 2) {
    const seedPair = [+seedsRaw[i], +seedsRaw[i + 1]];
    seedPairs.push(seedPair);
}

let seeds: number[] = []
let lowestLocationNumber = 0
let counter = 0

seedPairs.forEach(seedPair => {
    let count = seedPair[1]
    for (let i = seedPair[0]; count > 0; ++i, --count, ++counter) {
        const res = getLocationNumbers([i])[0]
        if (res < lowestLocationNumber || lowestLocationNumber === 0) {
            lowestLocationNumber = res
        }

        // console.log(counter);
        if (counter % 100000000 === 0) {
            console.log(counter);
        }
    }
});

console.log(counter);


// const result = getLocationNumbers(seeds);

// console.log(result);
// console.log(Math.min(...result))


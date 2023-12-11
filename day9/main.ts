import * as fs from "fs";

const input = fs.readFileSync("./day9/input.txt", "utf8");
const lines = input.split("\n");

// part 1

function getExtrapolatedValue(values: number[], lastVals?: number[]) {
  const resultValues: number[] = []
  // console.log(values);
  
  values.forEach((value, index) => {
    const next = values[index + 1]
    if (next !== undefined) {
      resultValues.push(next - value)
    } else {
      console.log(`last value: ${value}`);
      
      lastVals === undefined ? lastVals = [value] : lastVals.push(value)
    }
  })
  // console.log(resultValues);
  
  
  if (!resultValues.every(value => value === 0)) {
    return getExtrapolatedValue(resultValues, lastVals)
  }
    const diffs: number[] = []
    diffs.push(0)
    console.log(lastVals);
    
    lastVals!.forEach((value) => {
      const previousDiff = diffs[diffs.length - 1]
      // console.log(`value: ${value}, previousDiff: ${previousDiff}`);
      
      previousDiff ? diffs.push(value + previousDiff) : diffs.push(value)
    })
    // console.log(diffs);
    
    return diffs[diffs.length - 1]
}

let sum = 0

lines.forEach((line) => {
  const values = line.split(" ").map(Number)
  const res = getExtrapolatedValue(values)
  console.log(res);
  sum += res
})

console.log(sum);

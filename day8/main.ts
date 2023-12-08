import * as fs from "fs";

const input = fs.readFileSync("./day8/input.txt", "utf8");
const lines = input.split("\n");

// part 1

const directions = lines[0].split("");
const nonDirLines = lines.slice(2);

class Location {
  location!: string;
  directionLocations!: string[];
}

// AAA = (BBB, BBB)

const locations = nonDirLines.map((line) => {
  const loc = new Location();
  const split = line.split(" = (");
  loc.location = split[0];
  loc.directionLocations = split[1].split(", ");
  loc.directionLocations[1] = loc.directionLocations[1].slice(0, -1);
  return loc;
});

// console.log(directions);
// console.log(locations);

// let found = false
// let currentLocation = locations[0]
// let stepCount = 0
// while(!found) {
//     for (const direction of directions) {
//         if (currentLocation.location === 'ZZZ') {
//             found = true
//             console.log(stepCount);
//             break
//         }
//         ++stepCount
//         if (direction === 'L') {
//             currentLocation = locations.find(loc => loc.location === currentLocation.directionLocations[0])!
//         } else {
//             currentLocation = locations.find(loc => loc.location === currentLocation.directionLocations[1])!
//         }
//     }
// }

// part 2

let currentLocations = locations.filter((loc) => loc.location.endsWith("A"));
let stepCount = 0;
let found = false;
while (!found) {
  for (const direction of directions) {
    for (let i = 0; i < currentLocations.length; ++i) {
      let currentLocation = currentLocations[i];
      if (direction === "L") {
        currentLocations[i] = locations.find(
          (loc) => loc.location === currentLocation.directionLocations[0]
        )!;
      } else {
        currentLocations[i] = locations.find(
          (loc) => loc.location === currentLocation.directionLocations[1]
        )!;
      }
    }
    ++stepCount
    if (currentLocations.every((loc) => loc.location.endsWith('Z'))) {
        found = true
        break;
    }
    // console.log(currentLocations);
    
  }
}

console.log(stepCount);

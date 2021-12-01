import fs from 'fs';

const exampleDepths = [
  199,
  200,
  208,
  210,
  200,
  207,
  240,
  269,
  260,
  263
]

async function makeArrayFromFile(filepath: string): Promise<number[]> {
  const data = fs.readFileSync(filepath).toString()
  const strings = data.split('\n')
  return strings.map(s => parseInt(s))
}

function countIncreases(depths: number[]): number {
  let increased = 0;
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) increased++
  }
  return increased
}

function countIncreasesSlidingWindow(depths: number[]): number {
  let increased = 0;
  let prev = Number.MAX_SAFE_INTEGER
  for (let i = 2; i < depths.length; i++) {
    let sum = depths[i-2] + depths[i-1] + depths[i]
    if (sum > prev) increased ++
    prev = sum
  }
  return increased
}

( async () => {
  // console.log(countIncreases(exampleDepths))
  const nums = await makeArrayFromFile('inputs/01/input1.txt')
  console.log('1:', countIncreases(nums))
  console.log('2:', countIncreasesSlidingWindow(nums))
})()

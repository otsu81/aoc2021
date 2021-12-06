import fs from 'fs'

// this sucks, don't use this, array becomes too big
function multiplyFishRecursion(fishCounter: number[], counter: number, stopDay: number): number[] {
  if (counter === stopDay) return fishCounter
  const newFish: number[] = []
  let newFishCounter = fishCounter.map(f => {
    if (f === 0) {
      newFish.push(8)
      return f = 6
    } else {
      return --f
    }
  })
  newFishCounter = newFishCounter.concat(newFish)
  return multiplyFishRecursion(newFishCounter, ++counter, stopDay)
}

// this sucks, don't use this, the array gets too big
function* fishGenerator(fishCounter: number[]) {
  while(true) {
    const newFish: number[] = []
    let newFishCounter = fishCounter.map(f => {
      if (f === 0) {
        newFish.push(8)
        return f = 6
      } else {
        return --f
      }
    })
    yield newFishCounter.concat(newFish)
  }
}

// idea taken from reddit - keep track of only fish, use array index as days
// 7 days + fish of the day + tomorrow's fish = 9 elements
function fishArray(fishCounter: number[], days: number) {
  let fish = new Array<number>(9).fill(0)
  fishCounter.map(f => {
    let oldVal = fish[f]
    fish.splice(f, 1, ++oldVal)
  })
  for (let i = 0; i < days; i++) {
    let todaysFish = fish.shift() as number
    fish.push(todaysFish)
    fish.splice(6, 1, fish[6]+ todaysFish)
  }

  console.log(`Fish after ${days} days: `,
    fish.reduce((a, b) => a+b)
  )
}

( async() => {
  const fish = fs.readFileSync('inputs/06/input06.txt').toString().split(',').map(f => parseInt(f))

  fishArray(fish, 18)
  fishArray(fish, 80)
  fishArray(fish, 256)

})()
import fs from 'fs'

function fuelcost(crabs: number[], gauss?: boolean) {
  crabs = crabs.sort((a, b) => b-a)
  const consumption: number[] = []

  for (let i = 0; i < crabs[0]; i++) {
    const c = crabs.reduce((total, pos) => {
      const distance = Math.abs(i - pos)
      const cost = gauss ? distance*((distance + 1)/2) : distance
      return total + cost
    }, 0) // first crab distance cost is since it's the distance to itself
    consumption.push(c)
  }
  return Math.min(...consumption)
}

( async() => {
  const crabs = fs.readFileSync('inputs/example.07.txt').toString().split(',').map(c => parseInt(c))

  console.log('Part 1:', fuelcost(crabs))
  console.log('Part 2:', fuelcost(crabs, true))

})()
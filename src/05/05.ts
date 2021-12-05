import fs from 'fs'

const direction = (c1: number, c2: number): number => {
  if (c1 === c2) return 0
  else return c1 - c2 > 0 ? 1 : -1
}

function addCoordinate(m: Map<string, number>, key: string): Map<string, number> {
  const newVal = m.get(key) ? m.get(key) : 0
  m.set(key, newVal! + 1)
  return m
}

function makeVectors(tuples: string[][][]) {
  let coordinatesMap = new Map<string, number>()

  tuples.map((t) => {
    const x1 = parseInt(t[0][0])
    const y1 = parseInt(t[0][1])
    const x2 = parseInt(t[1][0])
    const y2 = parseInt(t[1][1])

    const vector = {
      ax: Math.abs(x2 - x1),
      xd: direction(x2, x1),
      ay: Math.abs(y2 - y1),
      yd: direction(y2, y1)
    }

    coordinatesMap = addCoordinate(coordinatesMap, `${x1},${y1}`)
    coordinatesMap = addCoordinate(coordinatesMap, `${x2},${y2}`)

    if (vector.ax == vector.ay) {
      for (let x = 1; x < vector.ax; x++) {
        coordinatesMap = addCoordinate(coordinatesMap, `${x1 + x*vector.xd},${y1 + x*vector.yd}`)
      }
    } else {
      for (let x = 1; x < vector.ax; x++) {
        coordinatesMap = addCoordinate(coordinatesMap, `${x1 + x*vector.xd},${y1}`)
      }
      for (let y = 1; y < vector.ay; y++) {
        coordinatesMap = addCoordinate(coordinatesMap, `${x1},${y1 + y*vector.yd}`)
      }
    }
  })

  let overlappingCoordinates = 0
  coordinatesMap.forEach(v => {
    if (v > 1) overlappingCoordinates++
  })
  return overlappingCoordinates

}

( async() => {
  const input = fs.readFileSync('inputs/05/input05.txt').toString().split('\n')
  const tuples = input
    .map(row => row.split(' -> ').map(tuple => tuple.split(',')))

  const part1Tuples = tuples.filter(t => t[0][0] === t[1][0] || t[0][1] == t[1][1])

  console.log('part 1:', makeVectors(part1Tuples))
  console.log('part 2:', makeVectors(tuples))

})()

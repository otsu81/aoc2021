import fs from 'fs'

const direction = (c1: number, c2: number): number => {
  if (c1 === c2) return 0
  else return c1 - c2 > 0 ? 1 : -1
}

function addPoint(m: Map<string, number>, key: string): Map<string, number> {
  const newVal = m.get(key) ? m.get(key) : 0
  m.set(key, newVal! + 1)
  return m
}

function makeVectors(tuples: string[][][]) {
  let pointsMap = new Map<string, number>()

  tuples.map((t, i) => {
    let x1 = parseInt(t[0][0])
    let y1 = parseInt(t[0][1])
    let x2 = parseInt(t[1][0])
    let y2 = parseInt(t[1][1])

    if (x1 == x2 || y1 == y2) {      // uncomment for part 1
    // if (true) {                         // uncomment for part 2
      let vector = {
        x: Math.abs(x2 - x1),
        xd: direction(x2, x1),
        y: Math.abs(y2 - y1),
        yd: direction(y2, y1)
      }

      pointsMap = addPoint(pointsMap, `${x1},${y1}`)
      pointsMap = addPoint(pointsMap, `${x2},${y2}`)

      if (vector.x == vector.y) {
        for (let x = 1; x < vector.x; x++) {
          pointsMap = addPoint(pointsMap, `${x1 + x*vector.xd},${y1 + x*vector.yd}`)
        }
      } else {
        for (let x = 1; x < vector.x; x++) {
          pointsMap = addPoint(pointsMap, `${x1 + x*vector.xd},${y1}`)
        }
        for (let y = 1; y < vector.y; y++) {
          pointsMap = addPoint(pointsMap, `${x1},${y1 + y*vector.yd}`)
        }
      }
    }
  })

  let overlappingPoints = 0
  pointsMap.forEach(v => {
    if (v > 1) overlappingPoints++
  })
  console.log(overlappingPoints)

}

( async() => {
  const input = fs.readFileSync('inputs/05/input05.txt').toString().split('\n')
  const tuples = input
    .map(row => row.split(' -> ').map(tuple => tuple.split(',')))

  makeVectors(tuples)

})()

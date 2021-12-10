import fs from 'fs'

function getNeighborPointValues(i: number, j: number, matrix: number[][]): number[] {
  let upDownLeftRight: number[] = []
  if (matrix[i-1] !== undefined) {
    upDownLeftRight.push(matrix[i-1][j])
  }
  if (matrix[i+1] !== undefined) {
    upDownLeftRight.push(matrix[i+1][j])
  }
  if (matrix[i][j-1] !== undefined) {
    upDownLeftRight.push(matrix[i][j-1])
  }
  if (matrix[i][j+1] !== undefined) {
    upDownLeftRight.push(matrix[i][j+1])
  }
  return upDownLeftRight
}

function getNeighborPointCoordinates(i: number, j: number, matrix: (number | undefined)[][]): number[][] {
  let upDownLeftRight: number[][] = []
  if (matrix[i][j] === undefined) return upDownLeftRight
  if (matrix[i-1] !== undefined) {
    upDownLeftRight.push([i-1, j])
  }
  if (matrix[i+1] !== undefined) {
    upDownLeftRight.push([i+1, j])
  }
  if (matrix[i][j-1] !== undefined) {
    upDownLeftRight.push([i, j-1])
  }
  if (matrix[i][j+1] !== undefined) {
    upDownLeftRight.push([i, j+1])
  }
  return upDownLeftRight
}

function getBasinPoints(i: number, j: number, matrix: (number | undefined)[][], basinPoints: Set<string>): Set<string> {
  basinPoints.add(`${i},${j}`)
  let potentialBasinPoints = getNeighborPointCoordinates(i, j, matrix)
  const moarPoints = potentialBasinPoints
    .filter(c => matrix[c[0]][c[1]] - matrix[i][j] === 1)
    .map(c => `${c[0]},${c[1]}`)
    .filter(c => !basinPoints.has(c))

  if (moarPoints.length === 0) {
    return basinPoints
  }
  else {
    moarPoints.forEach(p => basinPoints.add(p))
    moarPoints.forEach(p => {
      let [c1, c2] = p.split(',')
      basinPoints = new Set([...basinPoints, ...getBasinPoints(parseInt(c1), parseInt(c2), matrix, basinPoints)])
    })
    return basinPoints
  }
}

function isLowpoint(i: number, j: number, matrix: (number | undefined)[][]) {
  let point = matrix[i][j]
  let upDownLeftRight = getNeighborPointValues(i, j, matrix)
  return point < upDownLeftRight.sort((a, b) => a - b)[0]
}

function part1(matrix: number[][]) {
  let riskLevel = 0
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++ ) {
      let point = matrix[i][j]
      let upDownLeftRight = getNeighborPointValues(i, j, matrix)
      if (point < upDownLeftRight.sort((a, b) => a - b)[0]) riskLevel += matrix[i][j] + 1
    }
  }
  return riskLevel
}

function part2(matrix: (number | undefined)[][]) {
  let basins: number[] = []
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (isLowpoint(i, j, matrix)) {
        let bp = getBasinPoints(i, j, matrix, new Set<string>())
        let a = new Array<string>(...bp)
        a.map(c => {
          let [c1, c2] = c.split(',')
          matrix[parseInt[c1]][parseInt[c2]] = undefined
        })
        basins.push(getBasinPoints(i, j, matrix, new Set<string>()).size)
      }
    }
  }
  console.log(basins.sort((a, b) => b - a))
  console.log(basins[0] * basins[1] * basins[2])
}

( async() => {
  const matrix = fs.readFileSync('inputs/input.09.txt').toString().split('\n')
    .map(r => r.split(''))
    .map(r => r.map(v => parseInt(v) === 9 ? undefined : parseInt(v)))

  // console.log('part 1:', part1(matrix))

  console.log('part2:', part2(matrix))
  // console.log(matrix[3][9])


})()
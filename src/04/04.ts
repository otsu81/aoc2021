import fs from 'fs'

function makeWinningVals(boardVals: number[][]): number[] {
  let winningVals = [...boardVals]
  for (let i = 0; i < 5; i++) {
    let winningVal: number[] = []
    for (let j = 0; j < 5; j++) {
      winningVal.push(boardVals[j][i])
    }
    winningVals.push(winningVal)
  }
  return new Array<number>().concat(...winningVals)
}

function markNumber(num: number, numbers: number[]): number[] {
  return numbers.map(v => v === num ? -1 : v)
}

function checkIfWon(numbers: number[]): boolean {
  const sums: number[] = []
  for (let block = 0; block < numbers.length; block += 5) {
    sums.push(
      numbers
      .slice(block, block+5)
      .reduce((a, b) => a + b)
    )
  }
  return sums.includes(-5)
}

function calculateFinalScore(numbers: number[], drawnNumber: number): string {
  let sum = numbers
    .slice(0, 25)
    .filter(v => v !== -1)
    .reduce((a, b) => a+b)
  return `sum: ${sum}, drawnNumber: ${drawnNumber}, magicNumber: ${sum * drawnNumber}`
}

function makeBoardIntArrays(boards: string[][]): number[][] {
  let boardPotentialWinningCombinations: number[][] = []
  for (let b of boards) {
    let boardVals = b.map(row => row
      .trim()
      .replace(/ {2,}/g,' ')
      .split(' ')
      .map(val => parseInt(val))
    )
    boardPotentialWinningCombinations.push(makeWinningVals(boardVals))
  }
  return boardPotentialWinningCombinations
}

function part1(boards: string[][], drawNumbers: number[]): string | undefined {
  let boardPotentialWinningCombinations = makeBoardIntArrays(boards)

  let won = false
  let checkedBoards = [...boardPotentialWinningCombinations]
  do {
    let n = drawNumbers.shift() as number
    let checked = []
    for (let i = 0; i < boardPotentialWinningCombinations.length; i++) {
      checked.push(markNumber(n, checkedBoards.shift() as number[]))
    }

    for (let c of checked) {
      won = checkIfWon(c)
      if (won) {
        return calculateFinalScore(c, n)
      }
    }
    checkedBoards = [...checked]
  } while( !won && drawNumbers.length > 0)
}

// is it possible to find out which one is slowest without calculating all?
function part2(boards: string[][], numbers: number[]): string | undefined {
  const intBoards = makeBoardIntArrays(boards)
  const movesCounterMap = new Map<number, string>()
  for (let b of intBoards) {
    let won = false
    const nums = [...numbers]
    let counter = 0
    do {
      let n = nums.shift() as number
      b = markNumber(n, b)
      if (checkIfWon(b)) {
        won = true
        movesCounterMap.set(counter, calculateFinalScore(b, n))
        break
      }
      counter++
    } while ( !won && nums.length > 0)
  }
  const sortedMap = [...movesCounterMap.entries()].sort(([a], [b]) => a - b)
  return sortedMap.pop()?.toString()
}

( async() => {
  const input = fs.readFileSync('inputs/04/input04.txt').toString().split('\n\n')
  const numbers = input.shift()?.split(',').map(i => parseInt(i)) as number[]
  const boards = input.map(board => board.split('\n'))

  console.log('part1:', part1(boards, numbers))
  console.log('part2:', part2(boards, numbers))

})()
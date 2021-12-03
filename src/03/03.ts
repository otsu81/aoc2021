import fs from 'fs'
import { isEmpty } from 'lodash'

function makeSumsArray(diagnostic: string[]): number[] {
  let rows = 0
  let sumsArray = new Array<number>(diagnostic[0].length).fill(0)
  for (let d of diagnostic) {
    if (!isEmpty(d)) { // just making sure there's no straggling empty row
      for (let i = 0; i < d.length; i++) {
        sumsArray[i] += parseInt(d.charAt(i))
      }
      rows++;
    }
  }
  return sumsArray
}

function part1(diagnostic: string[]): number {
  const sumsArray = makeSumsArray(diagnostic)
  const gammaBits = sumsArray.map(b => b > diagnostic.length/2 ? 1 : 0)
  const epsilonBits = gammaBits.map(bit => (bit + 1) % 2)

  return parseInt(gammaBits.join(''), 2) * parseInt(epsilonBits.join(''), 2)
}

function filterRecursion(diagnostic: string[], charPosition: number, comparisonCheck: (a: number, b: number) => boolean): string[] {
  if (charPosition == diagnostic[0].length || diagnostic.length == 1) {return diagnostic}
  const sumsArray = makeSumsArray(diagnostic)

  const bitsArray = sumsArray.map((b) =>
    comparisonCheck(b, diagnostic.length/2) ? 1: 0
  )
  const filterChar = `${bitsArray[charPosition]}`
  return filterRecursion(
    diagnostic.filter(d => d.charAt(charPosition) === filterChar),
    ++charPosition,
    comparisonCheck
  )
}

function part2(diagnostic: string[]): number {
  const o2 = filterRecursion(diagnostic, 0, (a, b) => a >= b)
  const co2 = filterRecursion(diagnostic, 0, (a, b) => a < b)
  return parseInt(o2.join(''), 2) * parseInt(co2.join(''), 2)
}

( async() => {
  // const diagnostic = fs.readFileSync('inputs/03/example.txt').toString().split('\n')
  const diagnostic = fs.readFileSync('inputs/03/input.txt').toString().split('\n')
  console.log('Power consumption case1:', part1(diagnostic))
  console.log('Life support rating:', part2(diagnostic))
})()

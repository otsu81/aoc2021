import fs from 'fs'
import { isEmpty } from 'lodash'

async function makeArrayFromFile(filepath: string): Promise<string[]> {
  const data = fs.readFileSync(filepath).toString()
  const strings = data.split('\n')
  return strings
}

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

function case1(diagnostic: string[]): number {
  const sumsArray = makeSumsArray(diagnostic)
  const gammaBits = sumsArray.map(b => b > diagnostic.length/2 ? 1 : 0)
  const epsilonBits = gammaBits.map(bit => (bit + 1) % 2)

  return parseInt(gammaBits.join(''), 2) * parseInt(epsilonBits.join(''), 2)
}

function filterRecursion(diagnostic: string[], charPosition: number, co2scrub?: boolean): string[] {
  if (charPosition == diagnostic[0].length || diagnostic.length == 1) {return diagnostic}
  const sumsArray = makeSumsArray(diagnostic)
  let bitsArray: (0 | 1)[]

  if (co2scrub) {
    bitsArray = sumsArray.map(b => b < diagnostic.length/2 ? 1 : 0)
  } else {
    bitsArray = sumsArray.map(b => b >= diagnostic.length/2 ? 1 : 0)
  }
  const filterChar = `${bitsArray[charPosition]}`
  return filterRecursion(
    diagnostic.filter(d => d.charAt(charPosition) === filterChar),
    ++charPosition,
    co2scrub
  )
}

function case2(diagnostic: string[]): number {
  const o2 = filterRecursion(
    diagnostic,
    0,
  )
  const co2 = filterRecursion(
    diagnostic,
    0,
    true
  )
  return parseInt(o2.join(''), 2) * parseInt(co2.join(''), 2)
}

( async() => {
  // const diagnostic = await makeArrayFromFile('inputs/03/example.txt')
  const diagnostic = await makeArrayFromFile('inputs/03/input.txt')
  console.log('Power consumption case1:', case1(diagnostic))
  console.log('Life support rating:', case2(diagnostic))
})()

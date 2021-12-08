import fs from 'fs'

function part1(rows: string[]) {
  const digits = rows.map(r => {
    return r.slice(r.indexOf('|') + 2).split(' ').filter(v =>
      v.length === 2 || v.length === 4  || v.length === 3 || v.length === 7)
  })

  let sum = 0
  for (let d of digits) {
    sum += d.length
  }
  return sum
}

/*
https://github.com/caderek/aoc2021/blob/main/src/day08/index.ts
Segments for each number and relationships between them:
1 - c f            length 2 unique
4 - b c d f        length 4 unique
7 - a c f          length 3 unique
8 - a b c d e f g  length 7 unique
3 - a c d f g      length 5 contains 7
9 - a b c d f g    length 6 contains 4
5 - a b d f g      length 5 contained within 9
6 - a b d e f g    length 6 contains 5
2 - a c d e g      length 5 remaining
0 - a b c e f g    length 6 remaining
*/
function part2(rows: string[]) {
  const splits = rows.map(r => r.split(' | ').map(v => v.split(' ')))

  let sum = 0
  for (const [p, d] of splits) {
    const patterns = p.map((pattern) => pattern.split("").sort())
    const digits = d.map((digit) => digit.split("").sort().join(""))
    const indices: number[] = new Array(10)

    indices[1] = patterns.findIndex((p) => p.length === 2)
    indices[4] = patterns.findIndex((p) => p.length === 4)
    indices[7] = patterns.findIndex((p) => p.length === 3)
    indices[8] = patterns.findIndex((p) => p.length === 7)

    indices[3] = patterns.findIndex(
      (p) => p.length === 5 && patterns[indices[7]].every((x) => p.includes(x)),
    )

    indices[9] = patterns.findIndex(
      (p) => p.length === 6 && patterns[indices[4]].every((x) => p.includes(x)),
    )

    indices[5] = patterns.findIndex(
      (p, i) =>
        p.length === 5 &&
        p.every((x) => patterns[indices[9]].includes(x)) &&
        !indices.includes(i),
    )

    indices[2] = patterns.findIndex(
      (p, i) => p.length === 5 && !indices.includes(i),
    )

    indices[6] = patterns.findIndex(
      (p, i) =>
        p.length === 6 &&
        patterns[indices[5]].every((x) => p.includes(x)) &&
        !indices.includes(i),
    )

    indices[0] = patterns.findIndex(
      (p, i) => p.length === 6 && !indices.includes(i),
    )

    const deciphered = indices.map((index) => patterns[index].join(""))

    sum += Number(
      digits.map((digit) => deciphered.findIndex((x) => x === digit)).join(""),
    )
  }

  return sum
}

( async() => {
  const rows = fs.readFileSync('inputs/input.08.txt').toString().split('\n')

  console.log('part 1:', part1(rows))
  console.log('part 2:', part2(rows))
})()


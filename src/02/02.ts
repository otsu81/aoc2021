import fs from 'fs'

async function makeArrayFromFile(filepath: string): Promise<string[]> {
  const data = fs.readFileSync(filepath).toString()
  const strings = data.split('\n')
  return strings
}

function case1(instructions: string[]): number {
  let horisontal = 0
  let depth = 0
  for (let instruction of instructions) {
    let spl = instruction.split(' ')
    switch(spl[0]) {
      case 'forward':
        horisontal += parseInt(spl[1])
        break
      case 'down':
        depth += parseInt(spl[1])
        break
      case 'up':
        depth -= parseInt(spl[1])
        break
    }
  }

  return depth * horisontal
}

function case2(instructions: string[]): number {
  let horisontal = 0
  let depth = 0
  let aim = 0
  for (let instruction of instructions) {
    let spl = instruction.split(' ')
    switch(spl[0]) {
      case 'forward':
        horisontal += parseInt(spl[1])
        depth += aim * parseInt(spl[1])
        break
      case 'down':
        aim += parseInt(spl[1])
        break
      case 'up':
        aim -= parseInt(spl[1])
        break
    }
  }
  console.log('horizontal:', horisontal, 'depth:', depth)

  return depth * horisontal
}


( async() => {
  // const instructions = await makeArrayFromFile('inputs/02/simple.txt')
  const instructions = await makeArrayFromFile('inputs/02/input.txt')
  console.log(
    '1:', case1(instructions),
    '\n2:', case2(instructions)
  )
})()
const fs = require('fs')
const IO_FILE_PATH = '/usr/src/io.json'

const setOutput = (key, value) => {
  let data = null
  const blockId = process.env.BLOCK_ID

  if (fs.existsSync(IO_FILE_PATH)) {
    data = fs.readFileSync(IO_FILE_PATH, { encoding: 'utf8' })
    data = JSON.parse(data)
    if (!data.steps) {
      data.steps = {}
    }
    if (!data.steps[blockId]) {
      data.steps[blockId] = {}
    }
    if (!data.steps[blockId]['outputs']) {
      data.steps[blockId]['outputs'] = {}
    }
    data.steps[blockId]['outputs'][key] = value
  } else {
    data = {
      steps: {
        [blockId]: {
          ['outputs']: {
            [key]: value
          }
        }
      }
    }
  }
  fs.writeFileSync(IO_FILE_PATH, JSON.stringify(data), { encoding: 'utf8' })
}


const getInput = (key) => {
  const blockId = process.env.BLOCK_ID
  let data = null
  if (fs.existsSync(IO_FILE_PATH)) {
    data = fs.readFileSync(IO_FILE_PATH, { encoding: 'utf8' })
    data = JSON.parse(data)
    if (!data.steps) {
      throw new Error('Data not exists')
    }
    if (!data.steps[blockId]) {
      throw new Error('Data not exists')
    }

    if (data.steps[blockId].inputs && (key in data.steps[blockId].inputs)) {
      return data.steps[blockId].inputs[key]
    } else {
      throw new Error('Data not exists')
    }
  } else {
    throw new Error('Data not exists')
  }
}


const logFile = () => {
  console.log(fs.readFileSync(IO_FILE_PATH, { encoding: 'utf8' }))
}


module.exports = {
  getInput,
  setOutput,
  logFile
}
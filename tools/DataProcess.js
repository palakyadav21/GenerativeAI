const fs = require('fs')
const file = require('../files/context.txt')

const dataProcess = async () => {
  try {

    // actualFilePath = __dirname + "\\" + filePath

    // console.log(__dirname + "\\" + filePath)

    const data = fs.readFileSync(file);
    const question = "What happened in 1990 in Barcelona?"
  
    let prompt = question
  
    let json = {
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 4000,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }

    return json
  } catch (err) {
    console.error('Error', err)
  }
}

module.exports = {
  dataProcess
}
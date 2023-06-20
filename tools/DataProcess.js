const fs = require('fs')

const dataProcess = async (question) => {
  try {
    const data = fs.readFileSync(__dirname + "\\..\\files\\context.txt");
  
    let prompt = "In context of" + data + ", Answer: " + question
  
    let json = {
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 2000,
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
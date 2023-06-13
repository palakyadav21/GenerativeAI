const fs = require('fs')

// Specify the path to the file [TEMPORARY] [WILL CHANGE]
const filePath = './barca.txt';

// Read the file synchronously
try {
  // Read and extract data from text file
  const data = fs.readFileSync(filePath, 'utf8');

  // Process the data
  let prompt = `${data}\" according to this text, Answer the question \"`

  let json = {
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 7000,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  }
  
  // Test if json object is correct
  console.log(json);
} catch (err) {
  console.error('Error', err)
}

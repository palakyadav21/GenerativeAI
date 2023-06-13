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
    
  }
  
  // Test if prompt is correct
  console.log(prompt);
} catch (err) {
  console.error('Error', err)
}

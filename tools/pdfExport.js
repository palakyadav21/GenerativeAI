const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const assert = require('assert');

// pathStr = './barca.pdf';

const extractText = async (pathStr) => {
  assert (fs.existsSync(pathStr), `Path does not exist ${pathStr}`)
  const pdfFile = path.resolve(pathStr)
  const dataBuffer = fs.readFileSync(pdfFile);
  const data = await pdf(dataBuffer)
//   console.log(data.text)
//   return data.text
    fs.writeFileSync('./files/context.txt', data.text, (err) => {
        if(err) {
            throw err;
        }
        console.log("File has been created.")
    })
}

// extractText(pathStr)

module.exports = {
  extractText
}

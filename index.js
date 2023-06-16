const { extractText } = require('./tools/pdfExport');
const { dataProcess } = require('./tools/DataProcess');

extractText('./files/barca.pdf')

const json = dataProcess('./files/context.txt')

console.log(json)
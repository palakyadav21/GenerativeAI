//https://blobbydeol.blob.core.windows.net/kmicro/sidvats05/context.pdf
const fs = require('fs')
const https = require('https')
require('dotenv').config();

const username = process.env.USERNAME;

// File URL
const url = `https://blobbydeol.blob.core.windows.net/kmicro/${username}/context.pdf`

// Download the file
https
  .get(url, res => {
    // Open file in local filesystem
    const file = fs.createWriteStream(`./files/context.pdf`)

    // Write data into local file
    res.pipe(file)

    // Close the file
    file.on('finish', () => {
      file.close()
      console.log(`File downloaded!`)
    })
  })
  .on('error', err => {
    console.log('Error: ', err.message)
  })

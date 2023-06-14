import { pdfreader } from './node_modules/pdfreader/index';
const azure = require('azure-storage');
const { CognitiveServicesCredentials } = require('ms-rest-azure');
const { SearchIndexClient } = require('azure-search');

module.exports = async function (context, myBlob) {
  // Azure Blob Storage settings
  const blobConnString = process.env.AzureBlobStorageConnectionString;
  const containerName = process.env.AzureBlobStorageContainerName;

  // Azure Cognitive Search settings
  const searchServiceName = process.env.AzureSearchServiceName;
  const searchAdminKey = process.env.AzureSearchAdminKey;
  const indexName = process.env.AzureSearchIndexName;

  // Create a Blob Storage service client
  const blobService = azure.createBlobService(blobConnString);

  // Get the PDF file name
  const fileName = context.bindingData.name;

  // Extract text from the PDF (implement your own PDF parsing logic here)
  const extractedText = await extractTextFromPDF(myBlob);

  // Delete the PDF file from Blob Storage
  await deleteBlob(blobService, containerName, fileName);

  // Index the extracted text in Azure Cognitive Search
  const credentials = new CognitiveServicesCredentials(searchAdminKey);
  const searchClient = new SearchIndexClient(searchServiceName, indexName, credentials);
  const document = {
    id: fileName,
    content: extractedText
  };
  await searchClient.documents.index([document]);

  // Save the extracted text to a file named "context.txt"
  const outputFileName = './context.txt';
  const outputStream = blobService.createWriteStreamToBlockBlob(
    containerName,
    outputFileName,
    { contentSettings: { contentType: 'text/plain' } }
  );
  outputStream.write(extractedText, 'utf8');
  outputStream.end();

  context.log('Text extracted, PDF file deleted, and text saved successfully.');

  context.done();
};

async function extractTextFromPDF(pdfBuffer) {
  return new Promise((resolve, reject) => {
    const rows = [];
    new pdfreader.PdfReader().parseBuffer(pdfBuffer, (error, item) => {
      if (error) {
        reject(error);
      } else if (!item) {
        // Reached the end of the PDF
        const extractedText = rows.map(row => row.join(' ')).join('\n');
        resolve(extractedText);
      } else if (item.text) {
        // Store each line of text in rows for later processing
        const rowIndex = item.y || 0;
        rows[rowIndex] = rows[rowIndex] || [];
        rows[rowIndex].push(item.text);
      }
    });
  });
}

async function deleteBlob(blobService, containerName, blobName) {
  return new Promise((resolve, reject) => {
    blobService.deleteBlobIfExists(containerName, blobName, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

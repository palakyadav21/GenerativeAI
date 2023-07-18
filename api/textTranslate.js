const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const endpoint = process.env.ENDPOINT_KEY;
const key = process.env.TRANSLATE_API_KEY;

const location = 'centralindia';

const translate = async (sentence) => {
  try {
    const response = await axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString(),
      },
      params: {
        'api-version': '3.0',
        from: 'hi',
        to: ['en'],
      },
      data: [
        {
          text: sentence,
        },
      ],
      responseType: 'json',
    });

    const text = response.data[0].translations[0].text;
    // console.log(text);
    return text;
  } catch (error) {
    console.error('Translation failed:', error);
    throw error;
  }
};

module.exports = { translate };

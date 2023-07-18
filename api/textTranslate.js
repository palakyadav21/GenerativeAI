const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const endpoint = process.env.ENDPOINT_KEY;
const key =  process.env.TRANSLATE_API_KEY;

const location = "centralindia";
// const sentence = 'Aapka naam kya hai?';

const translate = async (sentence) => {
    await axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': 'hi',
            'to': ['en']
        },
        data: [{
            'text': sentence,
        }],
        responseType: 'json'
    }).then(function (response) {
        const text = (response.data[0].translations[0].text);
        console.log(text);
        return text;
    })

};

translate(sentence);
module.exports = {translate}
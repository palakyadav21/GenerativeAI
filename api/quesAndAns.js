const { Configuration, OpenAIApi } = require("openai");
const { dataProcess } = require('../tools/DataProcess')

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const quesAnsAPI = async (ques) => {
    const json = await dataProcess(ques)

    const response = await openai.createCompletion(json);
    const unprocessedResponse = response.data.choices[0].text;

    const processedResponse = unprocessedResponse.replace(/(\r\n|\n|\r)/gm, "");

    console.log(processedResponse);
};

module.exports = {quesAnsAPI}
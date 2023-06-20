const { Configuration, OpenAIApi } = require("openai");
const { dataProcess } = require('../tools/DataProcess')

const configuration = new Configuration({
    apiKey: OPEN_API,
});
const openai = new OpenAIApi(configuration);

const quesAnsAPI = async (ques) => {
    const json = await dataProcess(ques)

    const response = await openai.createCompletion(json);
    const unprocessedResponse = response.data.choices[0].text;

    console.log(unprocessedResponse);
};

module.exports = {quesAnsAPI}
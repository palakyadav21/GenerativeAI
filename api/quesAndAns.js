const { Configuration, OpenAIApi } = require("openai");
const { dataProcess } = require('../tools/DataProcess')

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const quesAnsAPI = async () => {

    const json = await dataProcess()

    const response = await openai.createCompletion(json);

    const parsableJSONresponse = response.data.choices[0].text;
	// const parsedResponse = JSON.parse(parsableJSONresponse);

    console.log(parsableJSONresponse);
};


quesAnsAPI()
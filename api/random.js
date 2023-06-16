const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = "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";

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const quesAnsAPI = async () => {

    let json = {
        model: "text-davinci-003",
        prompt: "prompt",
        temperature: 0.5,
        max_tokens: 7000,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:
            'I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ: Where is the Valley of Kings?\nA:',
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
    });

    const parsableJSONresponse = response.data.choices[0].text;
	// const parsedResponse = JSON.parse(parsableJSONresponse);

    console.log(parsableJSONresponse);
};


quesAnsAPI()
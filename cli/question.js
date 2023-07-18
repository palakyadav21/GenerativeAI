const { Command } = require("commander");
const { quesAnsAPI } = require("../api/quesAndAns");
const { translate } = require("../api/textTranslate");
const program = new Command();

program
  .command("question <ques>")
  .description("Takes an input for question")
  .alias('q')
  .action(async (ques) => {
    try {
      const question =  translate(ques)
      console.log("Your question is: " + question)
      quesAnsAPI(ques)      
      console.log(`Question Accepted\nAnswer:`);

    } catch (err) {
      console.error(err.message);
    }
  });

program.parse(process.argv);

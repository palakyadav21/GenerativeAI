const { Command } = require("commander");
const { quesAnsAPI } = require("../api/quesAndAns");
const program = new Command();

program
  .command("question <ques>")
  .description("Takes an input for question")
  .alias('q')
  .action(async (ques) => {
    try {
      quesAnsAPI(ques)      
      console.log(`Question Accepted\nAnswer:`);

    } catch (err) {
      console.error(err.message);
    }
  });

program.parse(process.argv);

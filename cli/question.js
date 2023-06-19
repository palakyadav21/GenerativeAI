const { Command } = require("commander");
// const { quesAnsAPI } = require("../api/quesAndAns");
const program = new Command();

program
  .command("question <ques>")
  .description("Takes an input for question")

  .action(async (ques) => {
    try {
        
    //   quesAnsAPI(ques)      
      console.log(`Question Accepted`);

    } catch (err) {
      console.error(err.message);
    }
  });

program.parse(process.argv);

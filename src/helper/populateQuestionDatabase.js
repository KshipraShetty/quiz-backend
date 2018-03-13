const rp = require('request-promise');
const models = require('../../models');

const populateQuestionDatabase = () => {
  const allQuestions = [];
  const url = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
  const axiosGet =
    rp(url)
      .then((questionsFromDB) => {
        const questionsFromData = JSON.parse(questionsFromDB);
        // console.log(JSON.parse(questionsFromDB).allQuestions, '#########################');
        questionsFromData.allQuestions.forEach((eachQuestion) => {
          const newQuest = {};
          newQuest.option = {};
          for (const key in eachQuestion) {
            if (key.indexOf('option') > -1) {
              newQuest.option[key] = eachQuestion[key];
            }
          }
          newQuest.questionId = eachQuestion.questionId;
          newQuest.question = eachQuestion.question;
          allQuestions.push(newQuest);
        });
        return models.question.bulkCreate(allQuestions);
      });
  return axiosGet;
};

module.exports = populateQuestionDatabase;

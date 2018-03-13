const rp = require('request-promise');
const models = require('../../models');

const populateAnswers = () => {
  let answerDB;
  const allPromise = [];
  return models.question.findAll()
    .then(allQuestions => allQuestions.map((eachQuestion) => {
      rp(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/${eachQuestion.questionId}`)
        .then((answers) => {
          const answerMod = JSON.parse(answers);
          answerDB = models.answer.create({
            questionId: eachQuestion.questionId,
            answer: answerMod.answer,

          });
          allPromise.push(answerDB);
        });
      return Promise.all(allPromise);
    }));
};

module.exports = populateAnswers;

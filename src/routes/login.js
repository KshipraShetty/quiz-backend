
const models = require('../../models');
const joi = require('joi');
const rp = require('request-promise');

const createUsers = username =>
  models.user.findOrCreate({
    where: {
      username,
    },
    defaults: {
      username,
    },
  });
// .then((response) => {
//   if (response[1]) {
//     return Promise.resolve('not exists');
//   }
//   return Promise.resolve('exists');
// });


const fetchQuestionDatabase = () => models.question.findAll()
  .then(questions => questions);

const checkQuestions = () => models.question.findAll()
  .then((allQuestions) => {
    if (allQuestions.length === 0) {
      return populateQuestionDatabase();
    } return fetchQuestionDatabase();
  });

const populateQuestionDatabase = () => {
  const allQuestions = [];
  const url = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
  const axiosGet =
  rp(url)
    .then((questionsFromDB) => {
      const questionsFromData = JSON.parse(questionsFromDB);
      console.log(JSON.parse(questionsFromDB).allQuestions, '#########################');
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


const fetchAnswerDatabase = () => models.answer.findAll()
  .then(answers => answers);

const createAnswers = () =>
  models.answer.findAll()
    .then((allAnswers) => {
      if (allAnswers.length === 0) {
        return populateAnswers();
      }
      return fetchAnswerDatabase();
    });


const getAnswerOfUser = username => models.user.findAll({
  where: {
    username,
  },
  include: [{
    model: models.useranswer,
  }],
});

module.exports = [
  {
    method: 'POST',
    path: '/login',
    config: {
      validate: {
        payload: {
          username: joi.string().min(3).required(),
        },
      },
      handler: (req, resp) => {
        createUsers(req.payload.username)
          .then(userStatus => checkQuestions()
            .then(questionStatus => createAnswers()
              .then(() =>
                getAnswerOfUser(req.payload.username)
                  .then((userAnswers) => {
                    let statusCode = 200;
                    if (userStatus[1]) {
                      statusCode = 201;
                    }
                    resp({
                      userAnswers,
                      questionStatus,
                      statusCode,
                    });
                  }))));
      },
    },
  },
];

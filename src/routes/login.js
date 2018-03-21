
const models = require('../../models');
const joi = require('joi');
// const rp = require('request-promise');
const populateQuestionDatabase = require('../helper/populateQuestionDatabase');
const populateAnswers = require('../helper/populateAnswers');
// const fetchAnswerDatabase = require('../helper/fetchAnswerDatabase');
// const fetchQuestionDatabase = require('../helper/fetchQuestionDatabase');

const createUsers = username =>
  models.user.presentOrNot(username);


const checkQuestions = () => models.question.findAllQuestions()
  .then((allQuestions) => {
    if (allQuestions.length === 0) {
      return populateQuestionDatabase();
    } return models.question.findAllQuestions();
  });

const createAnswers = () =>
  models.answer.findAllAnswers()
    .then((allAnswers) => {
      if (allAnswers.length === 0) {
        return populateAnswers();
      }
      return models.answer.findAllAnswers();
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
          username: joi.string().min(3).max(10).alphanum()
            .required(),
        },
        failAction(request, reply, source, error) {
          reply({ statusCode: 400 });
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
                  }))))
          .catch(() => resp({
            statusCode: 400,
          }));
      },
    },
  },
];

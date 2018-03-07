const models = require('../../models');


const checkIfAllAnswered = (length, userAnswers) => models.question.count()
  .then((count) => {
    let status = false;
    if (count === length) {
      status = true;
    }
    return [userAnswers, status];
  });


const getUserAnswer = (userId) => {
  let userAnswers;
  let length;
  return models.useranswer.findAll({
    where: {
      userId,
    },
  }).then((allAnswersByUser) => {
    length = allAnswersByUser.length;
    userAnswers = allAnswersByUser.map((eachAnswer) => {
      console.log(eachAnswer.dataValues);
      const newVal = {};

      newVal.questionId = eachAnswer.dataValues.questionId;
      newVal.answer = eachAnswer.dataValues.answer;
      return newVal;
    });
    return checkIfAllAnswered(length, userAnswers);
  });
};

const calculateScore = (userAnswers, userId) => {
  let score = 0;
  return models.answer.findAll()
    .then((correctAnswers) => {
      console.log(correctAnswers[0].questionId);
      console.log(userAnswers);


      for (let i = 0; i < userAnswers.length; i += 1) {
        for (let j = 0; j < correctAnswers.length; j += 1) {
          if (correctAnswers[j].questionId === userAnswers[i].questionId) {
            if (correctAnswers[j].answer === userAnswers[i].answer) {
              score += 1;
            }
          }
        }
      }
      return models.score.findOrCreate({
        where: {
          userId,
        },
        defaults: {
          userId,
          score,
        },

      })
        .spread((createdObj, created) => {
          if (created) {
            return createdObj;
          }
          return createdObj.updateAttributes({
            score,
          });
        });
      // return score;
    });
};

const leaderBoard = () => models.score.findAll({
  order: [
    ['score', 'DESC'],
  ],
  limit: 5,
});

module.exports = [{
  method: 'POST',
  path: '/calculateScore',
  handler: (req, resp) => {
    getUserAnswer(req.payload.userId)
      .spread((userAnswers, status) => {
        if (status) {
          return calculateScore(userAnswers, req.payload.userId)
            .then(() => leaderBoard()
              .then(allScores => resp(allScores)));
        }

        return resp('Answer all questions');
      });
  },
}];
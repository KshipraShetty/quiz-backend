const models = require('../../models');

const populateUserAnswer = (userId, answer, questionId) =>
  models.useranswer.findOrCreate({
    where: {
      userId,
      questionId,
    },
    defaults: {
      userId,
      answer,
      questionId,
    },
  });


const updateAnswer = (userId, answer, questionId) =>
  models.useranswer.findOne({
    where: {
      questionId,
      userId,
    },
  })
  // models.useranswer.findOneUser(questionId, userId)
    .then((user) => {
      user.updateAttributes({
        answer,
      });
    });

module.exports = [{
  method: 'POST',
  path: '/populateUserAnswer',
  handler: (req, resp) =>
    populateUserAnswer(req.payload.userId, req.payload.answer, req.payload.questionId)
      .spread((createdObj, created) => {
        if (created) {
          resp('updated new answer');
        } else {
          updateAnswer(req.payload.userId, req.payload.answer, req.payload.questionId)
            .then(() => resp('updated old user answer'));
        }
      }),
}];

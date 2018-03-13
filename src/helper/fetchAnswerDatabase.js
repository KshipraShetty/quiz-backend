const models = require('../../models');

const fetchAnswerDatabase = () => models.answer.findAllAnswers()
  .then(answers => answers);

module.exports = fetchAnswerDatabase;

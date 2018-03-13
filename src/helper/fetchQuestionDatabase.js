const models = require('../../models');

const fetchQuestionDatabase = () => models.question.findAll()
  .then(questions => questions);

module.exports = fetchQuestionDatabase;


module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('question', {
    questionId: DataTypes.INTEGER,
    question: DataTypes.STRING,
    option: DataTypes.JSON,
  }, {});
  question.associate = function (models) {
    // Question.hasMany(models.useranswer);
  };
  question.findAllQuestions = () => question.findAll();
  question.createQuestions = allQuestions => question.bulkCreate(allQuestions);

  return question;
};

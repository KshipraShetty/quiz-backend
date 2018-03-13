
module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define('answer', {
    questionId: DataTypes.INTEGER,
    answer: DataTypes.STRING,
  }, {});
  answer.associate = function (models) {
  //  answer.hasMany(models.Question);
  };
  answer.findAllAnswers = () => answer.findAll();
  answer.createAnswer = (questionId, answers) => answer.create({
    questionId,
    answer: answers,
  });
  return answer;
};


module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    qid: DataTypes.INTEGER,
    question: DataTypes.STRING,
    option: DataTypes.JSON,
  }, {});
  Question.associate = function (models) {
    // associations can be defined here
  };
  return Question;
};

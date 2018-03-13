
module.exports = (sequelize, DataTypes) => {
  const useranswer = sequelize.define('useranswer', {
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    answer: DataTypes.STRING,
  }, {});
  useranswer.associate = (models) => {
    // useranswer.belongsTo(models.User);
    // useranswer.belongsTo(models.Question);
  };

  useranswer.presentOrNot = (userId, questionId, answer) => useranswer.findOrCreate({
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

  useranswer.findOneUser = (userId, questionId) => useranswer.findOne({
    where: {
      questionId,
      userId,
    },
  });

  useranswer.findAllUserAnswers = userId => useranswer.findAll({
    where: {
      userId,
    },
  });

  return useranswer;
};

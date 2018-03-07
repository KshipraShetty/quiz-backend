
module.exports = (sequelize, DataTypes) => {
  const useranswer = sequelize.define('useranswer', {
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    answer: DataTypes.STRING,
  }, {});
  useranswer.associate = function (models) {
    // useranswer.belongsTo(models.User);
    // useranswer.belongsTo(models.Question);
  };
  return useranswer;
};

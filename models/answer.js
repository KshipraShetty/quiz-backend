
module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define('answer', {
    qid: DataTypes.INTEGER,
    answer: DataTypes.STRING,
  }, {});
  answer.associate = function (models) {
    answer.belongsTo(models.Question);
  };
  return answer;
};


module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define('answer', {
    questionId: DataTypes.INTEGER,
    answer: DataTypes.STRING,
  }, {});
  answer.associate = function (models) {
  //  answer.hasMany(models.Question);
  };
  return answer;
};

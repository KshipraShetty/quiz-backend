
module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define('answer', {
    qid: DataTypes.INTEGER,
    answer: DataTypes.STRING,
  }, {});
  answer.associate = function (models) {
    // associations can be defined here
  };
  return answer;
};

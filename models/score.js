
module.exports = (sequelize, DataTypes) => {
  const score = sequelize.define('score', {
    uid: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
  }, {});
  score.associate = function (models) {
    score.belongsTo(models.User);
  };
  return score;
};

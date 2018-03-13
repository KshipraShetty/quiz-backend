
module.exports = (sequelize, DataTypes) => {
  const score = sequelize.define('score', {
    userId: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
  }, {});
  score.associate = function (models) {
    // score.belongsTo(models.User);
  };

  score.findOrCreateScore = (userId, scores) => score.findOrCreate({
    where: {
      userId,
    },
    defaults: {
      userId,
      score: scores,
    },

  });
  return score;
};

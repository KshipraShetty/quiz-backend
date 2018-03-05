'use strict';
module.exports = (sequelize, DataTypes) => {
  var score = sequelize.define('score', {
    uid: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {});
  score.associate = function(models) {
    // associations can be defined here
  };
  return score;
};
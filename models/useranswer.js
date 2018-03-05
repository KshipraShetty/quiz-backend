'use strict';
module.exports = (sequelize, DataTypes) => {
  var useranswer = sequelize.define('useranswer', {
    uid: DataTypes.INTEGER,
    qid: DataTypes.INTEGER,
    answer: DataTypes.STRING
  }, {});
  useranswer.associate = function(models) {
    // associations can be defined here
  };
  return useranswer;
};

module.exports = (sequelize, DataTypes) => {
  const useranswer = sequelize.define('useranswer', {
    uid: DataTypes.INTEGER,
    qid: DataTypes.INTEGER,
    answer: DataTypes.STRING,
  }, {});
  useranswer.associate = function (models) {
    useranswer.belongsTo(models.User);
    useranswer.belongsTo(models.Question);
  };
  return useranswer;
};

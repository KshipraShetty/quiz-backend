
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
  }, {});
  user.associate = function (models) {
    models.user.hasMany(models.useranswer);
    models.user.hasOne(models.score);
  };
  return user;
};

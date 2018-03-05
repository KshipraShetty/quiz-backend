
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uid: DataTypes.INTEGER,
    username: DataTypes.STRING,
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};

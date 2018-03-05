
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('scores', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    uid: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'uid',
      },
    },
    score: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('scores'),
};

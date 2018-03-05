
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('useranswers', {
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
    qid: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Questions',
        key: 'qid',
      },
    },
    answer: {
      type: Sequelize.STRING,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('useranswers'),
};

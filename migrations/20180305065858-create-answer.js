
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('answers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('answers'),
};

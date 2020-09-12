module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('service_questions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('service_questions');
  },
};

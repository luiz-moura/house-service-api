module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('service_budget_request_files', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      service_budget_request_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'service_budget_requests',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      file_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'files',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
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
    return queryInterface.dropTable('service_budget_request_files');
  },
};

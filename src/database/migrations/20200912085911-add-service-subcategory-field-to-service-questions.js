module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'service_questions',
      'service_subcategory_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'service_subcategories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }
    );
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn(
      'service_questions',
      'service_subcategory_id'
    );
  },
};

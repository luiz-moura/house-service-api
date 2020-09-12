module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'service_subcategories',
      'service_category_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'service_categories',
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
      'service_subcategories',
      'service_category_id'
    );
  },
};

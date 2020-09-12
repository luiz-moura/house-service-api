module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('adresses', 'city_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'cities',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('adresses', 'city_id');
  },
};

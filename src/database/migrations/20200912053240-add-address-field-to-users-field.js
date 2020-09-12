module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users_adresses', 'address_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'adresses',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('users_adresses', 'address_id');
  },
};

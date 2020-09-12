module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users_adresses', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('users_adresses', 'user_id');
  },
};

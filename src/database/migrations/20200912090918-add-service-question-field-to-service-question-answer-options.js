module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'service_question_answer_options',
      'service_question_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'service_questions',
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
      'service_question_answer_options',
      'service_question_id'
    );
  },
};

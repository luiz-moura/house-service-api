import Sequelize, { Model } from 'sequelize';

class ServiceBudgetRequestAnswer extends Model {
  static init(sequelize) {
    super.init(
      {
        service_budget_request_id: Sequelize.INTEGER,
        service_question_answer_option_id: Sequelize.INTEGER,
        answer: Sequelize.STRING,
        note: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.ServiceBudgetRequest, {
      foreignKey: 'service_budget_request_id',
      as: 'service_budget_request',
    });
    this.belongsTo(models.ServiceQuestionAnswerOption, {
      foreignKey: 'service_question_answer_option_id',
      as: 'service_question_answer_option',
    });
  }
}

export default ServiceBudgetRequestAnswer;

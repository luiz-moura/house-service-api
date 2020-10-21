import Sequelize, { Model } from 'sequelize';

class ServiceBudgetRequestDescription extends Model {
  static init(sequelize) {
    super.init(
      {
        service_budget_request_id: Sequelize.INTEGER,
        description: Sequelize.STRING,
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
  }
}

export default ServiceBudgetRequestDescription;

import Sequelize, { Model } from 'sequelize';

class ServiceBudget extends Model {
  static init(sequelize) {
    super.init(
      {
        provider_id: Sequelize.INTEGER,
        service_budget_request_id: Sequelize.INTEGER,
        price: Sequelize.NUMBER,
        date_service: Sequelize.DATE,
        accepted: Sequelize.BOOLEAN,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
    this.belongsTo(models.ServiceBudgetRequest, {
      foreignKey: 'service_budget_request_id',
      as: 'service_budget_request',
    });
  }
}

export default ServiceBudget;

import Sequelize, { Model } from 'sequelize';

class ServiceBudgetRequestFile extends Model {
  static init(sequelize) {
    super.init(
      {
        service_budget_request_id: Sequelize.INTEGER,
        file_id: Sequelize.INTEGER,
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
    this.belongsTo(models.File, {
      foreignKey: 'file_id',
      as: 'file',
    });
  }
}

export default ServiceBudgetRequestFile;

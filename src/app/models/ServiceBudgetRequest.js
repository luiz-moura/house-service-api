import Sequelize, { Model } from 'sequelize';

class ServiceBudgetRequest extends Model {
  static init(sequelize) {
    super.init(
      {
        requester_id: Sequelize.INTEGER,
        service_subcategory_id: Sequelize.INTEGER,
        status: Sequelize.BOOLEAN,
        date_service: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.ServiceSubcategory, {
      foreignKey: 'service_subcategory_id',
      as: 'service_subcagetory',
    });
    this.belongsTo(models.User, {
      foreignKey: 'requester_id',
      as: 'requester',
    });
  }
}

export default ServiceBudgetRequest;

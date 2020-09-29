import Sequelize, { Model } from 'sequelize';

class ServiceQuestion extends Model {
  static init(sequelize) {
    super.init(
      {
        service_subcategory_id: Sequelize.INTEGER,
        question: Sequelize.STRING,
        order: Sequelize.INTEGER,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default ServiceQuestion;

import Sequelize, { Model } from 'sequelize';

class ServiceSubcategory extends Model {
  static init(sequelize) {
    super.init(
      {
        service_category_id: Sequelize.STRING,
        name: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default ServiceSubcategory;

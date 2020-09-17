import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        city_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
        street: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        complement: Sequelize.STRING,
        number: Sequelize.STRING,
        zip_code: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.City, { foreignKey: 'city_id', as: 'city' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Address;

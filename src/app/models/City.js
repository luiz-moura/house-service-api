import Sequelize, { Model } from 'sequelize';

class States extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
        state_id: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default States;

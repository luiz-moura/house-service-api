import Sequelize, { Model } from 'sequelize';

class State extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        initials: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default State;

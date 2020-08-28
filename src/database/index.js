import Sequelize from 'sequelize';

import Role from '../app/models/Role';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User, Role];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();

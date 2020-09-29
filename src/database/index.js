import Sequelize from 'sequelize';

import Role from '../app/models/Role';
import User from '../app/models/User';
import File from '../app/models/File';
import State from '../app/models/State';
import City from '../app/models/City';
import Address from '../app/models/Address';
import ServiceCategory from '../app/models/ServiceCategory';
import ServiceSubcategory from '../app/models/ServiceSubcategory';
import ServiceQuestion from '../app/models/ServiceQuestion';
import ServiceQuestionAnswerOption from '../app/models/ServiceQuestionAnswerOption';

import databaseConfig from '../config/database';

const models = [
  User,
  Role,
  File,
  State,
  City,
  Address,
  ServiceCategory,
  ServiceSubcategory,
  ServiceQuestion,
  ServiceQuestionAnswerOption,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();

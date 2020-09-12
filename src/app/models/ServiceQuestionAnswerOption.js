import Sequelize, { Model } from 'sequelize';

class ServiceQuestionAnswerOption extends Model {
  static init(sequelize) {
    super.init(
      {
        service_question_id: Sequelize.INTEGER,
        discursive: Sequelize.STRING,
        answer: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default ServiceQuestionAnswerOption;

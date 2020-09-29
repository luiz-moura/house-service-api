import * as Yup from 'yup';
import ServiceQuestionAnswerOption from '../models/ServiceQuestionAnswerOption';

class ServiceQuestionAnswerOptionController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const serviceQuestionAnswerOption = await ServiceQuestionAnswerOption.findAll(
      {
        attributes: [
          'id',
          'service_question_id',
          'discursive',
          'answer',
          'status',
        ],
        limit: 20,
        offset: (page - 1) * 20,
      }
    );

    return response.json(serviceQuestionAnswerOption);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      service_question_id: Yup.number().required(),
      discursive: Yup.string().required(),
      answer: Yup.string().required(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const serviceQuestionAnswerOptionExists = await ServiceQuestionAnswerOption.findOne(
      {
        where: {
          discursive: request.body.discursive,
          service_question_id: request.body.service_question_id,
        },
      }
    );

    if (serviceQuestionAnswerOptionExists) {
      return response
        .status(400)
        .json({ error: 'Service Question already exists.' });
    }

    const {
      id,
      service_question_id,
      discursive,
      answer,
      status,
    } = await ServiceQuestionAnswerOption.create(request.body);

    return response.json({
      id,
      service_question_id,
      discursive,
      answer,
      status,
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const { service_question_id, discursive, answer, status } = request.body;

    const serviceQuestionAnswerOption = await ServiceQuestionAnswerOption.findByPk(
      id
    );

    if (!serviceQuestionAnswerOption) {
      return response
        .status(400)
        .json({ error: 'Service Question Answer Option does not exist' });
    }

    if (discursive !== serviceQuestionAnswerOption.discursive) {
      const serviceQuestionAnswerOptionExists = await ServiceQuestionAnswerOption.findOne(
        { where: { discursive, service_question_id } }
      );

      if (serviceQuestionAnswerOptionExists) {
        return response
          .status(400)
          .json({ error: 'Service Question Answer Option already exists.' });
      }
    }

    const schema = Yup.object().shape({
      service_question_id: Yup.number(),
      discursive: Yup.string(),
      answer: Yup.string(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await serviceQuestionAnswerOption.update({
      service_question_id,
      discursive,
      answer,
      status,
    });

    return response.json({
      id,
      service_question_id,
      discursive,
      answer,
      status,
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    const serviceQuestionAnswerOption = await ServiceQuestionAnswerOption.findByPk(
      id
    );

    if (!serviceQuestionAnswerOption) {
      return response
        .status(400)
        .json({ error: 'Service Question Answer Option does not exist' });
    }

    await ServiceQuestionAnswerOption.destroy({ where: { id } });

    return response.json(serviceQuestionAnswerOption);
  }
}

export default new ServiceQuestionAnswerOptionController();

import * as Yup from 'yup';
import ServiceQuestion from '../models/ServiceQuestion';

class ServiceQuestionController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const serviceQuestions = await ServiceQuestion.findAll({
      attributes: [
        'id',
        'service_subcategory_id',
        'question',
        'order',
        'status',
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return response.json(serviceQuestions);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      service_subcategory_id: Yup.number().required(),
      question: Yup.string().required(),
      order: Yup.number().required(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const serviceQuestionExists = await ServiceQuestion.findOne({
      where: {
        question: request.body.question,
        service_subcategory_id: request.body.service_subcategory_id,
      },
    });

    if (serviceQuestionExists) {
      return response
        .status(400)
        .json({ error: 'Service Question already exists.' });
    }

    const {
      id,
      service_subcategory_id,
      question,
      order,
      status,
    } = await ServiceQuestion.create(request.body);

    return response.json({
      id,
      service_subcategory_id,
      question,
      order,
      status,
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const { service_subcategory_id, question, order, status } = request.body;

    const serviceQuestion = await ServiceQuestion.findByPk(id);

    if (!serviceQuestion) {
      return response
        .status(400)
        .json({ error: 'Service Question does not exist' });
    }

    if (question !== serviceQuestion.question) {
      const serviceQuestionExists = await ServiceQuestion.findOne({
        where: { question, service_subcategory_id },
      });

      if (serviceQuestionExists) {
        return response
          .status(400)
          .json({ error: 'Service Question already exists.' });
      }
    }

    const schema = Yup.object().shape({
      service_subcategory_id: Yup.number(),
      question: Yup.string(),
      order: Yup.number(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await serviceQuestion.update({
      service_subcategory_id,
      question,
      order,
      status,
    });

    return response.json({
      id,
      service_subcategory_id,
      question,
      order,
      status,
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    const serviceQuestion = await ServiceQuestion.findByPk(id);

    if (!serviceQuestion) {
      return response
        .status(400)
        .json({ error: 'Service Question does not exist' });
    }

    await ServiceQuestion.destroy({ where: { id } });

    return response.json(serviceQuestion);
  }
}

export default new ServiceQuestionController();

import * as Yup from 'yup';
import ServiceBudgetRequestAnswer from '../models/ServiceBudgetRequestAnswer';

class ServiceBudgetRequestAnswerController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const serviceBudgetRequestAnswer = await ServiceBudgetRequestAnswer.findAll(
      {
        attributes: [
          'id',
          'service_budget_request_id',
          'service_question_answer_option_id',
          'answer',
          'note',
        ],
        limit: 20,
        offset: (page - 1) * 20,
      }
    );

    return response.json(serviceBudgetRequestAnswer);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      service_budget_request_id: Yup.number().required(),
      service_question_answer_option_id: Yup.number().required(),
      answer: Yup.string().required(),
      note: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      service_budget_request_id,
      service_question_answer_option_id,
      answer,
      note,
    } = await ServiceBudgetRequestAnswer.create(request.body);

    return response.json({
      id,
      service_budget_request_id,
      service_question_answer_option_id,
      answer,
      note,
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      service_budget_request_id,
      service_question_answer_option_id,
      answer,
      note,
    } = request.body;

    const serviceBudgetRequestAnswer = await ServiceBudgetRequestAnswer.findByPk(
      id
    );

    if (!serviceBudgetRequestAnswer) {
      return response
        .status(400)
        .json({ error: 'Service Budget Request Answer does not exist' });
    }

    const schema = Yup.object().shape({
      service_budget_request_id: Yup.number(),
      service_question_answer_option_id: Yup.number(),
      answer: Yup.string(),
      note: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await serviceBudgetRequestAnswer.update({
      service_budget_request_id,
      service_question_answer_option_id,
      answer,
      note,
    });

    return response.json({
      id,
      service_budget_request_id,
      service_question_answer_option_id,
      answer,
      note,
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    const serviceBudgetRequestAnswer = await ServiceBudgetRequestAnswer.findByPk(
      id
    );

    if (!serviceBudgetRequestAnswer) {
      return response
        .status(400)
        .json({ error: 'Service Budget Request Answer does not exist' });
    }

    await ServiceBudgetRequestAnswer.destroy({ where: { id } });

    return response.json(serviceBudgetRequestAnswer);
  }
}

export default new ServiceBudgetRequestAnswerController();

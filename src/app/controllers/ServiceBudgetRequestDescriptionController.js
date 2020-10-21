import * as Yup from 'yup';
import ServiceBudgetRequestDescription from '../models/ServiceBudgetRequestDescription';

class ServiceBudgetRequestDescriptionController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const serviceBudgetRequestDescriptions = await ServiceBudgetRequestDescription.findAll(
      {
        attributes: ['id', 'service_budget_request_id', 'description'],
        limit: 20,
        offset: (page - 1) * 20,
      }
    );

    return response.json(serviceBudgetRequestDescriptions);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      service_budget_request_id: Yup.number().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const serviceBudgetRequestDescriptionExists = await ServiceBudgetRequestDescription.findOne(
      {
        where: {
          service_budget_request_id: request.body.service_budget_request_id,
        },
      }
    );

    if (serviceBudgetRequestDescriptionExists) {
      return response
        .status(400)
        .json({ error: 'Service Budget Resquest Description already exists.' });
    }

    const {
      id,
      service_budget_request_id,
      description,
    } = await ServiceBudgetRequestDescription.create(request.body);

    return response.json({
      id,
      service_budget_request_id,
      description,
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const { service_budget_request_id, description } = request.body;

    const serviceBudgetRequestDescription = await ServiceBudgetRequestDescription.findByPk(
      id
    );

    if (!serviceBudgetRequestDescription) {
      return response
        .status(400)
        .json({ error: 'Service Budget Request Answer does not exist' });
    }

    const schema = Yup.object().shape({
      service_budget_request_id: Yup.number(),
      description: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await serviceBudgetRequestDescription.update({
      service_budget_request_id,
      description,
    });

    return response.json({
      id,
      service_budget_request_id,
      description,
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    const serviceBudgetRequestDescription = await ServiceBudgetRequestDescription.findByPk(
      id
    );

    if (!serviceBudgetRequestDescription) {
      return response
        .status(400)
        .json({ error: 'Service Budget Request Answer does not exist' });
    }

    await ServiceBudgetRequestDescription.destroy({ where: { id } });

    return response.json(serviceBudgetRequestDescription);
  }
}

export default new ServiceBudgetRequestDescriptionController();

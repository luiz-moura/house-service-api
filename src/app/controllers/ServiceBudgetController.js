import * as Yup from 'yup';
import ServiceBudget from '../models/ServiceBudget';
import User from '../models/User';
import File from '../models/File';

class ServiceBudgetController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const serviceBudgets = await ServiceBudget.findAll({
      attributes: [
        'id',
        'provider_id',
        'service_budget_request_id',
        'price',
        'date_service',
        'accepted',
        'status',
      ],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'status', 'genre', 'provider', 'avatar_id'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return response.json(serviceBudgets);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      service_budget_request_id: Yup.number().required(),
      price: Yup.number().required(),
      date_service: Yup.date().required(),
      accepted: Yup.boolean().required(),
      status: Yup.boolean().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      provider_id,
      service_budget_request_id,
      price,
      date_service,
      accepted,
      status,
    } = await ServiceBudget.create(request.body);

    return response.json({
      id,
      provider_id,
      service_budget_request_id,
      price,
      date_service,
      accepted,
      status,
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      provider_id,
      service_budget_request_id,
      price,
      date_service,
      accepted,
      status,
    } = request.body;

    const serviceBudget = await ServiceBudget.findByPk(id);

    if (!serviceBudget) {
      return response
        .status(400)
        .json({ error: 'Service Budget Request Answer does not exist' });
    }

    const schema = Yup.object().shape({
      provider_id: Yup.number(),
      service_budget_request_id: Yup.number(),
      price: Yup.number(),
      date_service: Yup.date(),
      accepted: Yup.boolean(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await serviceBudget.update({
      provider_id,
      service_budget_request_id,
      price,
      date_service,
      accepted,
      status,
    });

    return response.json({
      id,
      provider_id,
      service_budget_request_id,
      price,
      date_service,
      accepted,
      status,
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    const serviceBudget = await ServiceBudget.findByPk(id);

    if (!serviceBudget) {
      return response
        .status(400)
        .json({ error: 'Service Budget Request Answer does not exist' });
    }

    await ServiceBudget.destroy({ where: { id } });

    return response.json(serviceBudget);
  }
}

export default new ServiceBudgetController();

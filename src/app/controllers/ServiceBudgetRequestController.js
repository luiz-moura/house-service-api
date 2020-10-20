import * as Yup from 'yup';
import ServiceBudgetRequest from '../models/ServiceBudgetRequest';

class ServiceBudgetRequestController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const serviceBudgetRequests = await ServiceBudgetRequest.findAll({
      attributes: [
        'id',
        'requester_id',
        'service_subcategory_id',
        'status',
        'date_service',
        'canceled_at',
        'created_at',
        'updated_at',
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return response.json(serviceBudgetRequests);
  }

  async store(request, response) {
    const serviceBudgetRequest = {
      ...request.body,
      requester_id: request.userId,
    };

    const schema = Yup.object().shape({
      service_subcategory_id: Yup.number().required(),
      status: Yup.boolean(),
      date_service: Yup.date().required(),
    });

    if (!(await schema.isValid(serviceBudgetRequest))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      requester_id,
      service_subcategory_id,
      status,
      date_service,
    } = await ServiceBudgetRequest.create(serviceBudgetRequest);

    return response.json({
      id,
      requester_id,
      service_subcategory_id,
      status,
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const { service_subcategory_id, status } = request.body;
    const requester_id = request.userId;

    const serviceBudgetRequest = await ServiceBudgetRequest.findByPk(id);

    if (!serviceBudgetRequest) {
      return response
        .status(400)
        .json({ error: 'Service Budget Request does not exist' });
    }

    const schema = Yup.object().shape({
      service_subcategory_id: Yup.number(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await serviceBudgetRequest.update({
      requester_id,
      service_subcategory_id,
      status,
    });

    return response.json({
      id,
      requester_id,
      service_subcategory_id,
      status,
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    const serviceBudgetRequest = await ServiceBudgetRequest.findByPk(id);

    if (!serviceBudgetRequest) {
      return response
        .status(400)
        .json({ error: 'Service Budget Request does not exist' });
    }

    await ServiceBudgetRequest.destroy({ where: { id } });

    return response.json(serviceBudgetRequest);
  }
}

export default new ServiceBudgetRequestController();

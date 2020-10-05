import * as Yup from 'yup';
import ServiceBudgetRequestFile from '../models/ServiceBudgetRequestFile';

class ServiceBudgetRequestFilesController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const serviceBudgetRequestFiles = await ServiceBudgetRequestFile.findAll({
      attributes: ['id', 'service_budget_request_id', 'file_id'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return response.json(serviceBudgetRequestFiles);
  }

  async store(request, response) {
    const serviceBudgetRequestFile = {
      ...request.body,
      requester_id: request.userId,
    };

    const schema = Yup.object().shape({
      service_budget_request_id: Yup.number().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(serviceBudgetRequestFile))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      service_budget_request_id,
      file_id,
    } = await ServiceBudgetRequestFile.create(serviceBudgetRequestFile);

    return response.json({
      id,
      service_budget_request_id,
      file_id,
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const { service_budget_request_id, file_id } = request.body;

    const serviceBudgetRequestFile = await ServiceBudgetRequestFile.findByPk(
      id
    );

    if (!serviceBudgetRequestFile) {
      return response
        .status(400)
        .json({ error: 'Service Budget Request does not exist' });
    }

    const schema = Yup.object().shape({
      service_budget_request_id: Yup.number(),
      file_id: Yup.number(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await serviceBudgetRequestFile.update({
      service_budget_request_id,
      file_id,
    });

    return response.json({
      id,
      service_budget_request_id,
      file_id,
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    const serviceBudgetRequestFile = await ServiceBudgetRequestFile.findByPk(
      id
    );

    if (!serviceBudgetRequestFile) {
      return response
        .status(400)
        .json({ error: 'Service Budget Request does not exist' });
    }

    await ServiceBudgetRequestFile.destroy({ where: { id } });

    return response.json(serviceBudgetRequestFile);
  }
}

export default new ServiceBudgetRequestFilesController();

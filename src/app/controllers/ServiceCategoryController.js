import * as Yup from 'yup';
import ServiceCategory from '../models/ServiceCategory';

class ServiceCategoryController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const serviceCategories = await ServiceCategory.findAll({
      attributes: ['id', 'name', 'status'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return response.json(serviceCategories);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const serviceCategoryExists = await ServiceCategory.findOne({
      where: { name: request.body.name },
    });

    if (serviceCategoryExists) {
      return response
        .status(400)
        .json({ error: 'Service Category already exists.' });
    }

    const { id, name, status } = await ServiceCategory.create(request.body);

    return response.json({ id, name, status });
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, status } = request.body;

    const serviceCategory = await ServiceCategory.findByPk(id);

    if (!serviceCategory) {
      return response
        .status(400)
        .json({ error: 'Service Category does not exist' });
    }

    if (name !== serviceCategory.name) {
      const serviceCategoryExists = await ServiceCategory.findOne({
        where: { name: request.body.name },
      });

      if (serviceCategoryExists) {
        return response
          .status(400)
          .json({ error: 'ServiceCategory already exists.' });
      }
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await serviceCategory.update({ name, status });

    return response.json({ id, name, status });
  }

  async delete(request, response) {
    const { id } = request.params;
    const serviceCategory = await ServiceCategory.findByPk(id);

    if (!serviceCategory) {
      return response
        .status(400)
        .json({ error: 'Service Category does not exist' });
    }

    await ServiceCategory.destroy({ where: { id } });

    return response.json(serviceCategory);
  }
}

export default new ServiceCategoryController();

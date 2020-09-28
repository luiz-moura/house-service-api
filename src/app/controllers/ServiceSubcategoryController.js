import * as Yup from 'yup';
import ServiceSubcategory from '../models/ServiceSubcategory';

class ServiceSubcategoryController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const ServiceSubcategories = await ServiceSubcategory.findAll({
      attributes: ['id', 'name', 'status'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return response.json(ServiceSubcategories);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      service_category_id: Yup.number().required(),
      name: Yup.string().required(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const serviceSubcategoryExists = await ServiceSubcategory.findOne({
      where: {
        name: request.body.name,
        service_category_id: request.body.service_category_id,
      },
    });

    if (serviceSubcategoryExists) {
      return response
        .status(400)
        .json({ error: 'Service Category already exists.' });
    }

    const {
      id,
      service_category_id,
      name,
      status,
    } = await ServiceSubcategory.create(request.body);

    return response.json({ id, service_category_id, name, status });
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, status } = request.body;

    const serviceSubcategory = await ServiceSubcategory.findByPk(id);

    if (!serviceSubcategory) {
      return response
        .status(400)
        .json({ error: 'Service Category does not exist' });
    }

    if (name !== serviceSubcategory.name) {
      const serviceSubcategoryExists = await ServiceSubcategory.findOne({
        where: { name: request.body.name },
      });

      if (serviceSubcategoryExists) {
        return response
          .status(400)
          .json({ error: 'ServiceSubcategory already exists.' });
      }
    }

    const schema = Yup.object().shape({
      service_category_id: Yup.number(),
      name: Yup.string(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await serviceSubcategory.update({ name, status });

    return response.json({ id, name, status });
  }

  async delete(request, response) {
    const { id } = request.params;
    const serviceSubcategory = await ServiceSubcategory.findByPk(id);

    if (!serviceSubcategory) {
      return response
        .status(400)
        .json({ error: 'Service Category does not exist' });
    }

    await ServiceSubcategory.destroy({ where: { id } });

    return response.json(serviceSubcategory);
  }
}

export default new ServiceSubcategoryController();

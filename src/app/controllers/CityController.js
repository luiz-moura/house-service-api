import * as Yup from 'yup';
import City from '../models/City';
import State from '../models/State';

class CityController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const cities = await City.findAll({
      attributes: ['id', 'name', 'status'],
      include: [
        {
          model: State,
          as: 'state',
          attributes: ['id', 'name', 'initials'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return response.json(cities);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      state_id: Yup.number().required(),
      name: Yup.string().required(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const cityExists = await City.findOne({
      where: { name: request.body.name },
    });

    if (cityExists) {
      return response.status(400).json({ error: 'City already exists.' });
    }

    const { id, name, status } = await City.create(request.body);

    return response.json({ id, name, status });
  }

  async update(request, response) {
    const { id } = request.params;
    const { role_id, name, status } = request.body;

    const city = await City.findByPk(id);

    if (!city) {
      return response.status(400).json({ error: 'City does not exist' });
    }

    if (name !== city.name) {
      const cityExists = await City.findOne({
        where: { name },
      });

      if (cityExists) {
        return response.status(400).json({ error: 'City already exists.' });
      }
    }

    const schema = Yup.object().shape({
      role_id: Yup.number(),
      name: Yup.string(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await city.update({ role_id, name, status });

    return response.json({ id, role_id, name, status });
  }

  async delete(request, response) {
    const { id } = request.params;
    const city = await City.findByPk(id);

    if (!city) {
      return response.status(400).json({ error: 'City does not exist' });
    }

    await City.destroy({ where: { id } });

    return response.json(city);
  }
}

export default new CityController();

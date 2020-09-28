import * as Yup from 'yup';
import { Op } from 'sequelize';
import State from '../models/State';

class StateController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const states = await State.findAll({
      attributes: ['id', 'name', 'initials', 'status'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return response.json(states);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      initials: Yup.string().required(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const stateExists = await State.findOne({
      where: {
        [Op.or]: [
          { name: request.body.name },
          { initials: request.body.initials },
        ],
      },
    });

    if (stateExists) {
      return response.status(400).json({ error: 'State already exists.' });
    }

    const { id, name, initials, status } = await State.create(request.body);

    return response.json({ id, name, initials, status });
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, initials, status } = request.body;

    const state = await State.findByPk(id);

    if (!state) {
      return response.status(400).json({ error: 'State does not exist' });
    }

    if (name !== state.name) {
      const stateExists = await State.findOne({
        where: {
          [Op.or]: [{ name }, { initials }],
        },
      });

      if (stateExists) {
        return response.status(400).json({ error: 'State already exists.' });
      }
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      initials: Yup.string(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await state.update({ name, initials, status });

    return response.json({ id, name, initials, status });
  }

  async delete(request, response) {
    const { id } = request.params;
    const state = await State.findByPk(id);

    if (!state) {
      return response.status(400).json({ error: 'State does not exist' });
    }

    await State.destroy({ where: { id } });

    return response.json(state);
  }
}

export default new StateController();

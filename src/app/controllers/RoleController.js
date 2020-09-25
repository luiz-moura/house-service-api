import * as Yup from 'yup';
import Role from '../models/Role';

class RoleController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const roles = await Role.findAll({
      attributes: ['id', 'name', 'display_name', 'status'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return response.json(roles);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      display_name: Yup.string().required(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const roleExists = await Role.findOne({
      where: { name: request.body.name },
    });

    if (roleExists) {
      return response.status(400).json({ error: 'Role already exists.' });
    }

    const { id, name, display_name, status } = await Role.create(request.body);

    return response.json({ id, name, display_name, status });
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, display_name, status = 1 } = request.body;

    const role = await Role.findByPk(id);

    if (!role) {
      return response.status(400).json({ error: 'Role does not exist' });
    }

    if (name !== role.name) {
      const roleExists = await Role.findOne({ where: { name } });

      if (roleExists) {
        return response.status(400).json({ error: 'Role already exists.' });
      }
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      display_name: Yup.string(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await role.update({ name, display_name, status });

    return response.json({ id, name, display_name, status });
  }

  async delete(request, response) {
    const { id } = request.params;
    const role = await Role.findByPk(id);

    if (!role) {
      return response.status(400).json({ error: 'Role does not exist' });
    }

    await Role.destroy({ where: { id } });

    return response.json(role);
  }
}

export default new RoleController();

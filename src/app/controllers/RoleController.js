import * as Yup from 'yup';
import Role from '../models/Role';

class RoleController {
  async index(request, response) {
    const roles = await Role.findAll({
      attributes: ['id', 'name', 'display_name', 'status'],
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

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      display_name: Yup.string().required(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await Role.update({ id, name, display_name, status }, { where: { id } });

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

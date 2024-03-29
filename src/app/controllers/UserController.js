import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import Role from '../models/Role';

class UserController {
  async index(request, response) {
    const providers = await User.findAll({
      attributes: ['id', 'name', 'provider', 'email', 'avatar_id', 'role_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Role,
          as: 'role',
          attributes: ['name', 'display_name', 'status'],
        },
      ],
    });

    return response.json(providers);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      role_id: Yup.number().required(),
      name: Yup.string().required(),
      genre: Yup.string().required(),
      status: Yup.boolean(),
      provider: Yup.boolean().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({
      where: { email: request.body.email },
    });

    if (userExists) {
      return response.status(400).json({ error: 'User already exists.' });
    }

    const {
      id,
      role_id,
      name,
      genre,
      provider,
      email,
      status,
    } = await User.create(request.body);

    return response.json({
      id,
      role_id,
      name,
      email,
      genre,
      status,
      provider,
    });
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      role_id: Yup.number(),
      name: Yup.string(),
      genre: Yup.string(),
      status: Yup.boolean(),
      provider: Yup.boolean(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = request.body;

    const user = await User.findByPk(request.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return response.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return response.status(401).json({ error: 'Password does not match.' });
    }

    const { id, role_id, name, genre, status, provider } = await user.update(
      request.body
    );

    return response.json({
      id,
      role_id,
      name,
      email,
      genre,
      status,
      provider,
    });
  }
}

export default new UserController();

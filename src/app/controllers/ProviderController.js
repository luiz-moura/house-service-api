import User from '../models/User';
import File from '../models/File';
import Role from '../models/Role';

class ProviderController {
  async index(request, response) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id', 'role_id'],
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
}

export default new ProviderController();

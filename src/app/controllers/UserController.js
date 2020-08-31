import User from '../models/User';

class UserController {
  async store(request, response) {
    const userExists = await User.findOne({
      where: { email: request.body.email },
    });

    if (userExists) {
      return response.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, nickname, genre, email, status } = await User.create(
      request.body
    );

    return response.json({
      id,
      name,
      nickname,
      email,
      genre,
      status,
    });
  }

  async update(request, response) {
    // console.log(request.userId);

    return response.json({ ok: true });
  }
}

export default new UserController();

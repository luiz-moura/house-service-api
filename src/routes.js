import { Router } from 'express';

import User from './app/models/User';
// import Role from './app/models/Role';

const routes = new Router();

routes.get('/', async (request, response) => {
  const user = await User.create({
    name: 'Luiz Moura',
    nickname: '🌀',
    genre: 'senha',
    status: 1,
    email: 'luizhom@outlook.com',
    password: '12345678',
  });

  response.json(user);
});

export default routes;

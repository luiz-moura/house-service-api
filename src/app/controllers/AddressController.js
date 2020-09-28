import * as Yup from 'yup';
import Address from '../models/Address';

class AddressController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const adresses = await Address.findAll({
      attributes: ['id', 'name', 'status'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return response.json(adresses);
  }

  async store(request, response) {
    const address = { ...request.body, user_id: request.userId };

    const schema = Yup.object().shape({
      city_id: Yup.number().required(),
      street: Yup.string().required(),
      neighborhood: Yup.string().required(),
      complement: Yup.string(),
      number: Yup.number().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      user_id,
      city_id,
      street,
      neighborhood,
      complement,
      number,
      zip_code,
    } = await Address.create(address);

    return response.json({
      id,
      user_id,
      city_id,
      street,
      neighborhood,
      complement,
      number,
      zip_code,
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const user_id = request.userId;
    const {
      city_id,
      street,
      neighborhood,
      complement,
      number,
      zip_code,
    } = request.body;

    const address = await Address.findByPk(id);

    if (!address) {
      return response.status(400).json({ error: 'Address does not exist' });
    }

    const schema = Yup.object().shape({
      city_id: Yup.number(),
      street: Yup.string(),
      neighborhood: Yup.string(),
      complement: Yup.string(),
      number: Yup.number(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    await address.update({
      user_id,
      city_id,
      street,
      neighborhood,
      complement,
      number,
      zip_code,
    });

    return response.json({
      user_id,
      city_id,
      street,
      neighborhood,
      complement,
      number,
      zip_code,
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    const address = await Address.findByPk(id);

    if (!address) {
      return response.status(400).json({ error: 'Address does not exist' });
    }

    await Address.destroy({ where: { id } });

    return response.json(address);
  }
}

export default new AddressController();

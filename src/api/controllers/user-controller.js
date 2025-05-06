import {comparePassword, hashPassword} from '../../utils/crypto.js';
import Joi from 'joi';
import {updateUser} from '../models/user-model.js';
import {findByEmail} from '../models/user-model.js';

const updateUserController = async (req, res) => {
  const data = Object.fromEntries(
    Object.entries(req.body).map(([key, value]) => [
      key,
      typeof value === 'string' && value.trim() === '' ? null : value,
    ])
  );

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    new_password: Joi.string().min(8).allow(null).optional(),
    username: Joi.string().allow(null).optional(),
    first_name: Joi.string().allow(null).optional(),
    last_name: Joi.string().allow(null).optional(),
    address: Joi.string().allow(null).optional(),
    phone: Joi.number().allow(null).optional(),
  });

  const {error} = schema.validate(data);
  if (error) return res.status(400).json({message: error.message});

  const user = await findByEmail(data.email);
  if (!user) return res.status(400).json({message: 'User not found'});

  const isMatch = await comparePassword(data.password, user.password);
  if (!isMatch) return res.status(400).json({message: 'Invalid credentials'});

  const hashedPassword = data.new_password
    ? await hashPassword(data.new_password)
    : null;

  const userData = {
    id: user.ID,
    email: data.email,
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name,
    address: data.address,
    new_password: hashedPassword,
    phone: data.phone,
  };

  await updateUser(userData);

  res.status(200).json({message: 'User updated'});
};
export {updateUserController};

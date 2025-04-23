import Joi from 'joi';

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const {error} = schema.validate(req.body);
  if (error) return res.status(400).json({error: error.message});
  next();
};

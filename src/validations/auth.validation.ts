import Joi from 'joi';

export const signupSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const forgotSchema = Joi.object({
  email: Joi.string().email().required()
});

export const updateSchema = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().email().optional()
});
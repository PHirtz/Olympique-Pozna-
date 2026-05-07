import Joi from 'joi';

export const teamCreateSchema = Joi.object({
  name: Joi.string().max(100).required(),
  namePl: Joi.string().max(100).allow('', null),
  category: Joi.string().valid('senior', 'u19', 'u17', 'u15', 'u13', 'u11', 'u9', 'u7').required(),
  gender: Joi.string().valid('male', 'female', 'mixed').default('male'),
  season: Joi.string().max(20).required(),
  description: Joi.string().allow('', null),
  descriptionPl: Joi.string().allow('', null),
  coachId: Joi.number().integer().positive().allow(null),
  isActive: Joi.boolean().default(true)
});

export const teamUpdateSchema = Joi.object({
  name: Joi.string().max(100),
  namePl: Joi.string().max(100).allow('', null),
  category: Joi.string().valid('senior', 'u19', 'u17', 'u15', 'u13', 'u11', 'u9', 'u7'),
  gender: Joi.string().valid('male', 'female', 'mixed'),
  season: Joi.string().max(20),
  description: Joi.string().allow('', null),
  descriptionPl: Joi.string().allow('', null),
  coachId: Joi.number().integer().positive().allow(null),
  isActive: Joi.boolean(),
  imageUrl: Joi.string().uri().max(255).allow('', null),
  imagePath: Joi.string().max(255).allow('', null)
}).min(1);

export const teamQuerySchema = Joi.object({
  category: Joi.string().valid('senior', 'u19', 'u17', 'u15', 'u13', 'u11', 'u9', 'u7'),
  gender: Joi.string().valid('male', 'female', 'mixed'),
  season: Joi.string().max(20),
  isActive: Joi.boolean(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});
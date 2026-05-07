import Joi from 'joi';

export const newsCreateSchema = Joi.object({
  title: Joi.string().max(200).required(),
  titlePl: Joi.string().max(200).allow('', null),
  slug: Joi.string().max(250).required(),
  content: Joi.string().required(),
  contentPl: Joi.string().allow('', null),
  excerpt: Joi.string().max(300).allow('', null),
  excerptPl: Joi.string().max(300).allow('', null),
  authorId: Joi.number().integer().positive().required(),
  teamId: Joi.number().integer().positive().allow(null),
  category: Joi.string().valid('match_report', 'event', 'announcement', 'general').default('general'),
  publishedAt: Joi.date().iso().allow(null),
  status: Joi.string().valid('draft', 'published', 'archived').default('draft'),
  isPinned: Joi.boolean().default(false)
});

export const newsUpdateSchema = Joi.object({
  title: Joi.string().max(200),
  titlePl: Joi.string().max(200).allow('', null),
  slug: Joi.string().max(250),
  content: Joi.string(),
  contentPl: Joi.string().allow('', null),
  excerpt: Joi.string().max(300).allow('', null),
  excerptPl: Joi.string().max(300).allow('', null),
  authorId: Joi.number().integer().positive(),
  teamId: Joi.number().integer().positive().allow(null),
  category: Joi.string().valid('match_report', 'event', 'announcement', 'general'),
  publishedAt: Joi.date().iso().allow(null),
  status: Joi.string().valid('draft', 'published', 'archived'),
  isPinned: Joi.boolean(),
  imageUrl: Joi.string().uri().max(255).allow('', null),
  imagePath: Joi.string().max(255).allow('', null)
}).min(1);

export const newsQuerySchema = Joi.object({
  status: Joi.string().valid('draft', 'published', 'archived'),
  category: Joi.string().valid('match_report', 'event', 'announcement', 'general'),
  teamId: Joi.number().integer().positive(),
  authorId: Joi.number().integer().positive(),
  isPinned: Joi.boolean(),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});
import Joi from 'joi';

export const matchCreateSchema = Joi.object({
  teamId: Joi.number().integer().positive().required(),
  opponentName: Joi.string().max(100).required(),
  matchDate: Joi.date().iso().required(),
  location: Joi.string().max(200).required(),
  isHome: Joi.boolean().default(true),
  competition: Joi.string().max(100).allow('', null),
  status: Joi.string().valid('scheduled', 'in_progress', 'finished', 'cancelled', 'postponed').default('scheduled'),
  scoreHome: Joi.number().integer().min(0).allow(null),
  scoreAway: Joi.number().integer().min(0).allow(null),
  matchReport: Joi.string().allow('', null),
  matchReportPl: Joi.string().allow('', null)
});

export const matchUpdateSchema = Joi.object({
  teamId: Joi.number().integer().positive(),
  opponentName: Joi.string().max(100),
  matchDate: Joi.date().iso(),
  location: Joi.string().max(200),
  isHome: Joi.boolean(),
  competition: Joi.string().max(100).allow('', null),
  status: Joi.string().valid('scheduled', 'in_progress', 'finished', 'cancelled', 'postponed'),
  scoreHome: Joi.number().integer().min(0).allow(null),
  scoreAway: Joi.number().integer().min(0).allow(null),
  matchReport: Joi.string().allow('', null),
  matchReportPl: Joi.string().allow('', null)
}).min(1);

export const matchQuerySchema = Joi.object({
  teamId: Joi.number().integer().positive(),
  status: Joi.string().valid('scheduled', 'in_progress', 'finished', 'cancelled', 'postponed'),
  isHome: Joi.boolean(),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});
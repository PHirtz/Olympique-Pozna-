import Joi from 'joi';

const nameRegex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻàâéèêëîïôùûüçÀÂÉÈÊËÎÏÔÙÛÜÇ\s\-']+$/;
const usernameRegex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9_\-]+$/;

export const userCreateSchema = Joi.object({
  lastName: Joi.string().max(100).pattern(nameRegex).required(),
  firstName: Joi.string().max(100).pattern(nameRegex).required(),
  email: Joi.string().email().max(150).required(),
  username: Joi.string().pattern(usernameRegex).min(3).max(20).required(),
  password: Joi.string().min(8).max(100).required(),
  role: Joi.string().valid('admin', 'coach', 'player', 'member').default('member'),
  bio: Joi.string().allow('', null),
  phoneNumber: Joi.string().max(20).allow('', null),
  dateOfBirth: Joi.date().iso().allow(null),
  nationality: Joi.string().max(50).allow('', null),
  playerNumber: Joi.number().integer().min(1).max(99).allow(null),
  position: Joi.string().max(50).allow('', null),
  teamId: Joi.number().integer().positive().allow(null),
  membershipStatus: Joi.string().valid('active', 'inactive', 'pending').default('pending'),
  membershipStartDate: Joi.date().iso().allow(null),
  membershipEndDate: Joi.date().iso().allow(null),
  preferredLanguage: Joi.string().valid('fr', 'pl', 'en').default('fr'),
  isActive: Joi.boolean().default(true)
});

export const userUpdateSchema = Joi.object({
  lastName: Joi.string().max(100).pattern(nameRegex),
  firstName: Joi.string().max(100).pattern(nameRegex),
  email: Joi.string().email().max(150),
  username: Joi.string().pattern(usernameRegex).min(3).max(20),
  password: Joi.string().min(8).max(100),
  role: Joi.string().valid('admin', 'coach', 'player', 'member'),
  bio: Joi.string().allow('', null),
  phoneNumber: Joi.string().max(20).allow('', null),
  dateOfBirth: Joi.date().iso().allow(null),
  nationality: Joi.string().max(50).allow('', null),
  playerNumber: Joi.number().integer().min(1).max(99).allow(null),
  position: Joi.string().max(50).allow('', null),
  teamId: Joi.number().integer().positive().allow(null),
  membershipStatus: Joi.string().valid('active', 'inactive', 'pending'),
  membershipStartDate: Joi.date().iso().allow(null),
  membershipEndDate: Joi.date().iso().allow(null),
  preferredLanguage: Joi.string().valid('fr', 'pl', 'en'),
  isActive: Joi.boolean(),
  imageUrl: Joi.string().uri().max(255).allow('', null),
  imagePath: Joi.string().max(255).allow('', null)
}).min(1);

export const userLoginSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required()
});

export const userQuerySchema = Joi.object({
  role: Joi.string().valid('admin', 'coach', 'player', 'member'),
  teamId: Joi.number().integer().positive(),
  membershipStatus: Joi.string().valid('active', 'inactive', 'pending'),
  isActive: Joi.boolean(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});
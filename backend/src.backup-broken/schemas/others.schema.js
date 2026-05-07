import Joi from 'joi';

// PRODUCT SCHEMAS
export const productCreateSchema = Joi.object({
  name: Joi.string().max(150).required(),
  namePl: Joi.string().max(150).allow('', null),
  description: Joi.string().allow('', null),
  descriptionPl: Joi.string().allow('', null),
  price: Joi.number().precision(2).positive().required(),
  currency: Joi.string().length(3).default('EUR'),
  category: Joi.string().valid('jersey', 'clothing', 'accessories', 'equipment', 'other').required(),
  stock: Joi.number().integer().min(0).default(0),
  isAvailable: Joi.boolean().default(true),
  sizes: Joi.array().items(Joi.string()).allow(null),
  colors: Joi.array().items(Joi.string()).allow(null)
});

export const productUpdateSchema = Joi.object({
  name: Joi.string().max(150),
  namePl: Joi.string().max(150).allow('', null),
  description: Joi.string().allow('', null),
  descriptionPl: Joi.string().allow('', null),
  price: Joi.number().precision(2).positive(),
  currency: Joi.string().length(3),
  category: Joi.string().valid('jersey', 'clothing', 'accessories', 'equipment', 'other'),
  stock: Joi.number().integer().min(0),
  isAvailable: Joi.boolean(),
  sizes: Joi.array().items(Joi.string()).allow(null),
  colors: Joi.array().items(Joi.string()).allow(null),
  imageUrl: Joi.string().uri().max(255).allow('', null),
  imagePath: Joi.string().max(255).allow('', null)
}).min(1);

export const productQuerySchema = Joi.object({
  category: Joi.string().valid('jersey', 'clothing', 'accessories', 'equipment', 'other'),
  isAvailable: Joi.boolean(),
  minPrice: Joi.number().precision(2).min(0),
  maxPrice: Joi.number().precision(2).min(0),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});

// EVENT SCHEMAS
export const eventCreateSchema = Joi.object({
  title: Joi.string().max(200).required(),
  titlePl: Joi.string().max(200).allow('', null),
  description: Joi.string().allow('', null),
  descriptionPl: Joi.string().allow('', null),
  eventDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().allow(null),
  location: Joi.string().max(200).required(),
  locationPl: Joi.string().max(200).allow('', null),
  type: Joi.string().valid('training', 'tournament', 'social', 'meeting', 'other').required(),
  teamId: Joi.number().integer().positive().allow(null),
  maxParticipants: Joi.number().integer().positive().allow(null),
  registrationRequired: Joi.boolean().default(false),
  status: Joi.string().valid('upcoming', 'ongoing', 'completed', 'cancelled').default('upcoming')
});

export const eventUpdateSchema = Joi.object({
  title: Joi.string().max(200),
  titlePl: Joi.string().max(200).allow('', null),
  description: Joi.string().allow('', null),
  descriptionPl: Joi.string().allow('', null),
  eventDate: Joi.date().iso(),
  endDate: Joi.date().iso().allow(null),
  location: Joi.string().max(200),
  locationPl: Joi.string().max(200).allow('', null),
  type: Joi.string().valid('training', 'tournament', 'social', 'meeting', 'other'),
  teamId: Joi.number().integer().positive().allow(null),
  maxParticipants: Joi.number().integer().positive().allow(null),
  registrationRequired: Joi.boolean(),
  status: Joi.string().valid('upcoming', 'ongoing', 'completed', 'cancelled'),
  imageUrl: Joi.string().uri().max(255).allow('', null),
  imagePath: Joi.string().max(255).allow('', null)
}).min(1);

export const eventQuerySchema = Joi.object({
  type: Joi.string().valid('training', 'tournament', 'social', 'meeting', 'other'),
  status: Joi.string().valid('upcoming', 'ongoing', 'completed', 'cancelled'),
  teamId: Joi.number().integer().positive(),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});

// GALLERY SCHEMAS
export const galleryCreateSchema = Joi.object({
  title: Joi.string().max(150).required(),
  titlePl: Joi.string().max(150).allow('', null),
  description: Joi.string().allow('', null),
  descriptionPl: Joi.string().allow('', null),
  imageUrl: Joi.string().uri().max(255).required(),
  imagePath: Joi.string().max(255).required(),
  albumName: Joi.string().max(100).allow('', null),
  eventId: Joi.number().integer().positive().allow(null),
  matchId: Joi.number().integer().positive().allow(null),
  teamId: Joi.number().integer().positive().allow(null),
  uploadedBy: Joi.number().integer().positive().required(),
  isPublic: Joi.boolean().default(true)
});

export const galleryUpdateSchema = Joi.object({
  title: Joi.string().max(150),
  titlePl: Joi.string().max(150).allow('', null),
  description: Joi.string().allow('', null),
  descriptionPl: Joi.string().allow('', null),
  albumName: Joi.string().max(100).allow('', null),
  eventId: Joi.number().integer().positive().allow(null),
  matchId: Joi.number().integer().positive().allow(null),
  teamId: Joi.number().integer().positive().allow(null),
  isPublic: Joi.boolean()
}).min(1);

export const galleryQuerySchema = Joi.object({
  albumName: Joi.string().max(100),
  eventId: Joi.number().integer().positive(),
  matchId: Joi.number().integer().positive(),
  teamId: Joi.number().integer().positive(),
  isPublic: Joi.boolean(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});

// PARTNER SCHEMAS
export const partnerCreateSchema = Joi.object({
  name: Joi.string().max(150).required(),
  description: Joi.string().allow('', null),
  descriptionPl: Joi.string().allow('', null),
  websiteUrl: Joi.string().uri().max(255).allow('', null),
  category: Joi.string().valid('main_sponsor', 'official_partner', 'supplier', 'media_partner').default('official_partner'),
  displayOrder: Joi.number().integer().default(0),
  isActive: Joi.boolean().default(true)
});

export const partnerUpdateSchema = Joi.object({
  name: Joi.string().max(150),
  description: Joi.string().allow('', null),
  descriptionPl: Joi.string().allow('', null),
  websiteUrl: Joi.string().uri().max(255).allow('', null),
  category: Joi.string().valid('main_sponsor', 'official_partner', 'supplier', 'media_partner'),
  displayOrder: Joi.number().integer(),
  isActive: Joi.boolean(),
  logoUrl: Joi.string().uri().max(255).allow('', null),
  logoPath: Joi.string().max(255).allow('', null)
}).min(1);

export const partnerQuerySchema = Joi.object({
  category: Joi.string().valid('main_sponsor', 'official_partner', 'supplier', 'media_partner'),
  isActive: Joi.boolean(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});

// STATISTICS SCHEMAS
export const statisticsCreateSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  season: Joi.string().max(20).required(),
  matchesPlayed: Joi.number().integer().min(0).default(0),
  goals: Joi.number().integer().min(0).default(0),
  assists: Joi.number().integer().min(0).default(0),
  yellowCards: Joi.number().integer().min(0).default(0),
  redCards: Joi.number().integer().min(0).default(0),
  minutesPlayed: Joi.number().integer().min(0).default(0)
});

export const statisticsUpdateSchema = Joi.object({
  matchesPlayed: Joi.number().integer().min(0),
  goals: Joi.number().integer().min(0),
  assists: Joi.number().integer().min(0),
  yellowCards: Joi.number().integer().min(0),
  redCards: Joi.number().integer().min(0),
  minutesPlayed: Joi.number().integer().min(0)
}).min(1);

export const statisticsQuerySchema = Joi.object({
  userId: Joi.number().integer().positive(),
  season: Joi.string().max(20),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});
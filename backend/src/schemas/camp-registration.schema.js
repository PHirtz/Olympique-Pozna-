import Joi from 'joi';

export const campRegistrationCreateSchema = Joi.object({
  campId: Joi.number().integer().positive().required(),
  
  // Participant
  childFirstName: Joi.string().max(100).required(),
  childLastName: Joi.string().max(100).required(),
  childDateOfBirth: Joi.date().iso().max('now').required(),
  childGender: Joi.string().valid('male', 'female', 'other').required(),
  
  // Parent
  parentFirstName: Joi.string().max(100).required(),
  parentLastName: Joi.string().max(100).required(),
  parentEmail: Joi.string().email().max(150).required(),
  parentPhone: Joi.string().max(20).required(),
  
  // Adresse
  address: Joi.string().max(255).required(),
  city: Joi.string().max(100).required(),
  postalCode: Joi.string().max(20).required(),
  country: Joi.string().max(100).default('Pologne'),
  
  // Médical
  medicalInfo: Joi.string().allow('', null),
  emergencyContact: Joi.string().max(150).required(),
  emergencyPhone: Joi.string().max(20).required(),
  
  // Sport
  sportLevel: Joi.string().valid('beginner', 'intermediate', 'advanced').required(),
  previousExperience: Joi.string().allow('', null),
  
  // Divers
  dietaryRestrictions: Joi.string().allow('', null),
  specialNeeds: Joi.string().allow('', null),
  comments: Joi.string().allow('', null),
  
  // Consentements
  termsAccepted: Joi.boolean().valid(true).required(),
  gdprConsent: Joi.boolean().valid(true).required(),
  photoConsent: Joi.boolean().required()
});

export const campRegistrationUpdateSchema = Joi.object({
  // Participant
  childFirstName: Joi.string().max(100),
  childLastName: Joi.string().max(100),
  childDateOfBirth: Joi.date().iso().max('now'),
  childGender: Joi.string().valid('male', 'female', 'other'),
  
  // Parent
  parentFirstName: Joi.string().max(100),
  parentLastName: Joi.string().max(100),
  parentEmail: Joi.string().email().max(150),
  parentPhone: Joi.string().max(20),
  
  // Adresse
  address: Joi.string().max(255),
  city: Joi.string().max(100),
  postalCode: Joi.string().max(20),
  country: Joi.string().max(100),
  
  // Médical
  medicalInfo: Joi.string().allow('', null),
  emergencyContact: Joi.string().max(150),
  emergencyPhone: Joi.string().max(20),
  
  // Sport
  sportLevel: Joi.string().valid('beginner', 'intermediate', 'advanced'),
  previousExperience: Joi.string().allow('', null),
  
  // Divers
  dietaryRestrictions: Joi.string().allow('', null),
  specialNeeds: Joi.string().allow('', null),
  comments: Joi.string().allow('', null),
  
  // Statut (admin seulement)
  status: Joi.string().valid('pending', 'confirmed', 'paid', 'cancelled', 'waiting_list'),
  paymentStatus: Joi.string().valid('pending', 'partial', 'completed', 'refunded'),
  paymentAmount: Joi.number().precision(2).min(0).allow(null),
  paymentDate: Joi.date().iso().allow(null),
  
  // Consentements
  photoConsent: Joi.boolean()
}).min(1);

export const campRegistrationQuerySchema = Joi.object({
  campId: Joi.number().integer().positive(),
  status: Joi.string().valid('pending', 'confirmed', 'paid', 'cancelled', 'waiting_list'),
  paymentStatus: Joi.string().valid('pending', 'partial', 'completed', 'refunded'),
  parentEmail: Joi.string().email(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});
import Joi from 'joi';

export const contactCreateSchema = Joi.object({
  // Accepter SOIT firstName/lastName SOIT name
  firstName: Joi.string()
    .min(2)
    .max(100)
    .messages({
      'string.min': 'Le prénom doit contenir au moins 2 caractères',
      'string.max': 'Le prénom ne peut pas dépasser 100 caractères'
    }),
  
  lastName: Joi.string()
    .min(2)
    .max(100)
    .messages({
      'string.min': 'Le nom doit contenir au moins 2 caractères',
      'string.max': 'Le nom ne peut pas dépasser 100 caractères'
    }),
  
  name: Joi.string()
    .min(2)
    .max(200)
    .messages({
      'string.min': 'Le nom complet doit contenir au moins 2 caractères',
      'string.max': 'Le nom complet ne peut pas dépasser 200 caractères'
    }),
  
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'L\'adresse email n\'est pas valide',
      'any.required': 'L\'email est obligatoire'
    }),
  
  phone: Joi.string()
    .min(10)
    .max(20)
    .allow(null, '')
    .messages({
      'string.min': 'Le numéro de téléphone doit contenir au moins 10 caractères',
      'string.max': 'Le numéro de téléphone ne peut pas dépasser 20 caractères'
    }),
  
  // Accepter SOIT subject SOIT category
  subject: Joi.string()
    .min(3)
    .max(255)
    .messages({
      'string.min': 'Le sujet doit contenir au moins 3 caractères',
      'string.max': 'Le sujet ne peut pas dépasser 255 caractères'
    }),
  
  category: Joi.string()
    .valid('coach', 'footj', 'foots', 'sponsor', 'volunteer', 'other')
    .messages({
      'any.only': 'La catégorie sélectionnée n\'est pas valide'
    }),
  
  message: Joi.string()
    .min(10)
    .max(5000)
    .required()
    .messages({
      'string.min': 'Le message doit contenir au moins 10 caractères',
      'string.max': 'Le message ne peut pas dépasser 5000 caractères',
      'any.required': 'Le message est obligatoire'
    })
})
  // Au moins l'un des deux formats de nom
  .or('firstName', 'name')
  // Au moins l'un des deux pour le sujet
  .or('subject', 'category')
  // Si firstName est présent, lastName est requis
  .with('firstName', 'lastName')
  .messages({
    'object.missing': 'Vous devez fournir soit un nom complet, soit prénom et nom',
    'object.with': 'Le nom est obligatoire quand le prénom est fourni'
  });

export const contactUpdateStatusSchema = Joi.object({
  status: Joi.string()
    .valid('new', 'read', 'replied', 'archived')
    .required()
});

export const contactQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  status: Joi.string().valid('new', 'read', 'replied', 'archived')
});
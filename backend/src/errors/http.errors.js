// Classe de base pour les erreurs HTTP
export class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 400 - Bad Request
export class HttpBadRequestError extends HttpError {
  constructor(message = 'Requête invalide') {
    super(message, 400);
  }
}

// 401 - Unauthorized
export class HttpUnauthorizedError extends HttpError {
  constructor(message = 'Non autorisé') {
    super(message, 401);
  }
}

// 403 - Forbidden
export class HttpForbiddenError extends HttpError {
  constructor(message = 'Accès refusé') {
    super(message, 403);
  }
}

// 404 - Not Found
export class HttpNotFoundError extends HttpError {
  constructor(message = 'Ressource introuvable') {
    super(message, 404);
  }
}

// 409 - Conflict
export class HttpConflictError extends HttpError {
  constructor(message = 'Conflit avec une ressource existante') {
    super(message, 409);
  }
}

// 422 - Unprocessable Entity
export class HttpUnprocessableEntityError extends HttpError {
  constructor(message = 'Entité non traitable') {
    super(message, 422);
  }
}

// 500 - Internal Server Error
export class HttpInternalServerError extends HttpError {
  constructor(message = 'Erreur interne du serveur') {
    super(message, 500);
  }
}
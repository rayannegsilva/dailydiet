export class ApiError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

// Erro
export class BadRequestError extends ApiError {
  constructor (message: string) {
    super(message, 400)
  }
}

// Autorização
export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, 403)
  }
}

// Não encontrado
export class NotFoundError extends ApiError {
  constructor (message: string) {
    super(message, 404)
  }
}

//
export class Unauthorized extends ApiError {
  constructor (message: string) {
    super(message, 401)
  }
 }

 export class ConflitedError extends ApiError {
  constructor (message: string) {
    super(message, 409)
  }
 }

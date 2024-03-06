import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
  sub: string
}

export function Authorization (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization
  if (!authToken) {
    throw new Error('Você não tem permissões suficientes!')
  }

  const [, token] = authToken.split(' ')

  try {
    const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload

    req.user_id = sub

    return next()
  } catch (error) {
    console.log(error)
    throw new Error('Você não tem permissões suficientes!')
  }
}

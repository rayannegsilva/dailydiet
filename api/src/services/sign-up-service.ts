import { User } from "../model/User"
import { hash } from 'bcrypt'
import { BadRequestError, ConflitedError } from "../helpers/api-error"
import { sign } from 'jsonwebtoken'


interface User {
  id: string
  name: string | null | undefined
  email: string | null | undefined
  profile_photo: string | null | undefined
}

interface SignUpRequest {
  email: string
  password: string
  name: string
}

interface SignUpResponse {
  user: User
  token: string
}

 export class SignUpService {
  async execute ({ email, password, name }: SignUpRequest): Promise<SignUpResponse> {
    console.log(email)

    if(!email || !password) {
      throw new BadRequestError('Email não informado')
    }

    const userAlreadyExists = await User.findOne({ email })

    if (userAlreadyExists) {
      throw new ConflitedError('Usuário já existe')
    }

    const passwordHash = await hash(password, 8)

    const userFinded = await User.create({
      email, password: passwordHash, name
    })

    const token = sign(
      { email: userFinded.email },
      process.env.JWT_SECRET as string,
      { subject: userFinded.id, expiresIn: '7d' }
    )

    const user = {
      id: userFinded.id,
      name: userFinded.name,
      email: userFinded.email,
      profile_photo: '',
    }

    return {
      user,
      token
    }
  }
}

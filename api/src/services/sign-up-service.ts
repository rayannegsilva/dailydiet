import { User } from "../model/User"
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface SignUpRequest {
  email: string
  password: string
}

interface SignUpResponse {
  id: string
  name: string | null | undefined
  email: string | null | undefined
  profile_photo: string | null | undefined
  token: string
}

 export class SignUpService {
  async execute ({ email, password }: SignUpRequest): Promise<SignUpResponse> {
    console.log(email)

    if(!email) {
      throw new Error('Email não informado')
    }

    const userAlreadyExists = await User.findOne({ email })

    if (userAlreadyExists) {
      throw new Error('Usuário já existe')
    }

    const passwordHash = await hash(password, 8)

    const user = await User.create({
      email, password: passwordHash
    })

    const token = sign(
      { email: user.email },
      process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: '2d'
    })

    return {
      id: user.id,
      name: '',
      email: user.email,
      profile_photo: '',
      token
    }
  }
}

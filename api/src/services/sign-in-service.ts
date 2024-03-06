import { User } from "../model/User"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
  id: string
  name: string | null | undefined
  email: string | null | undefined
  profile_photo: string | null | undefined
  token: string
}

export class SignInService {
  async execute({ email, password }: SignInRequest): Promise<SignInResponse> {
    const user = await User.findOne({
      email
    })

    if (!user) {
      throw new Error('Usuário ou senha incorreta.')
    }

    const passwordMatch = await compare(password, user.password as string)

    if (!passwordMatch) {
      throw new Error('Usuário ou senha incorreta.')
    }

    const token = sign (
      {
        name: user.name,
        email: user.email
      }, process.env.JWT_SECRET as string, {
        subject: user.id,
        expiresIn: '1 day'
      })

      return {
        id: user.id,
        name: user.name || '',
        email: user.email,
        profile_photo: user.profile_photo || '',
        token
      }
  }
}

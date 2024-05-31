import { User } from "../model/User"
import { compare } from "bcrypt"
import { Unauthorized } from "../helpers/api-error"
import { sign } from "jsonwebtoken"

interface User {
  id: string
  name: string | null | undefined
  email: string | null | undefined
  profile_photo: string | null | undefined
}

interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
  user: User
  token: string
}

export class SignInService {
  async execute({ email, password }: SignInRequest): Promise<SignInResponse> {
    const userFind = await User.findOne({
      email
    })

    if (!userFind) {
      throw new Unauthorized('Usuário ou senha incorreta.')
    }

    const passwordMatch = await compare(password, userFind.password as string)

    if (!passwordMatch) {
      throw new Unauthorized('Usuário ou senha incorreta.')
    }

    const token = sign (
      { email: userFind.email },
      process.env.JWT_SECRET as string,
      { subject: userFind.id,
        expiresIn: '7d'
      })

      const user = {
        id: userFind.id,
        name: userFind.name || '',
        email: userFind.email,
        profile_photo: userFind.profile_photo || '',
      }

      return {
        token,
        user
      }
  }
}

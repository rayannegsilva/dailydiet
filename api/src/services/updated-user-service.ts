import * as multer from 'multer';
import { User } from "../model/User"
import { ConflitedError, NotFoundError, Unauthorized } from '../helpers/api-error';
import { compare, hash } from 'bcrypt';

interface UpdatedUserRequest {
  userId: string
  email: string
  newPassword: string
  oldPassword: string
}

export class UpdatedUserService {
  async execute({ userId, email, newPassword, oldPassword}: UpdatedUserRequest) {
    const user = await User.findOne({ email })

    if(!user) {
      throw new NotFoundError('Usuário não encontrado')
    }

    const passwordMatch = await compare(oldPassword, user.password as string)

    if(newPassword === oldPassword) {
      throw new ConflitedError('Nova senha deve ser diferente da antiga.')
    }

    if(!passwordMatch) {
      throw new Unauthorized('Usuário ou senha incorreta.')
    }

    const passwordHash = await hash(newPassword, 8)

    const updatedUser = User.findByIdAndUpdate(userId, {
      password: passwordHash
    })

    return updatedUser
  }
}

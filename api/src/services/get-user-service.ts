import { User } from "../model/User"
import { Unauthorized } from "../helpers/api-error"

interface GetUserServiceRequest {
  userId: string
}

export class GetUserService {
  async execute({ userId }: GetUserServiceRequest) {
      if(!userId) {
        throw new Unauthorized('Usuário não encontrando ou inexistente.')
      }

      const userFound = await User.findById( userId )

      const user = {
        id: userFound?._id,
        email: userFound?.email,
        name: '',
        profile_photo: '',
      }

      return user
  }
}

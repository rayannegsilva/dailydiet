import { NotFoundError } from "../helpers/api-error"
import { Meal } from "../model/Meal"
import { User } from "../model/User"

interface DeleteMealRequest {
  mealId: string
  userId: string
}

export class DeleteMeaService {
  async execute({ mealId, userId }: DeleteMealRequest) {

    const user = await User.findById(userId)

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.')
    }

    const mealToDelete = await Meal.findById(mealId)

   if (!mealToDelete) {
    throw new NotFoundError('Refeição não encontrada.')
   }

    return await Meal.findByIdAndDelete(mealId)
  }
}

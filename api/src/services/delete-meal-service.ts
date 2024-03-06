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
      throw new Error('Usuário não encontrado.')
    }

    const mealToDelete = await Meal.findById(mealId)

   if (!mealToDelete) {
    throw new Error('Refeição não encontrada.')
   }

    return await Meal.findByIdAndDelete(mealId)
  }
}

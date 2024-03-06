import { Meal } from "../model/Meal"
import { User } from "../model/User"

interface MealUpdate {
  title: string
  description: string,
  date: Date,
  isDiet: boolean,
}

interface EditMealRequest {
  userId: string
  mealId: string
  mealData: MealUpdate
}

export class EditMealService {
  async execute({ userId, mealId, mealData }: EditMealRequest) {

    const user = await User.findById(userId)
    if(!user) {
      throw new Error('Usuário não encontrado')
    }

    const mealAlreadyExists = await Meal.findById(mealId)
    if(!mealAlreadyExists) {
      throw new Error('Refeição inexistente.')
    }

    const updateMeal = await Meal.findByIdAndUpdate(mealId, mealData, { new: true })
    if (!updateMeal) {
      throw new Error('Não vou possível editar o Meal.')
    }

    return { updateMeal }
  }
}

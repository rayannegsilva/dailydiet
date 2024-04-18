import { NotFoundError } from "../helpers/api-error"
import { Meal } from "../model/Meal"
import { User } from "../model/User"

interface GetMealByIDServiceRequest {
  userId: string
  mealId: string
}

export class GetMealByIDService {
  async execute ({userId, mealId}: GetMealByIDServiceRequest) {

    const user = await User.findById(userId)

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.')
    }

    const meal = await Meal.findById(mealId)

    if (!meal) {
        throw new NotFoundError('Refeição não encontrada.')
      }

    const mealById = {
      id: meal._id,
      title: meal.title,
      description: meal.description,
      date: meal.date,
      isDiet: meal.isDiet,
      createdAt: meal.createdAt,
      updated: meal.updatedAt,
      userId: meal.userId
    }

    return mealById
  }
}

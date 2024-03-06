import { Meal } from "../model/Meal"
import { User } from "../model/User"

interface GetUserMealRequest {
  userId: string
}

export class GetUserMealService {
  async execute({ userId }: GetUserMealRequest) {
    const user = await User.findById(userId)
    if(!user) {
      throw new Error('Usuário não encontrado')
    }

    const meals = await Meal.find({ userId })

    const userMeals = meals.map((meal) => ({
      id: meal._id,
      title: meal.title,
      description: meal.description,
      date: meal.date,
      isDiet: meal.isDiet,
      createdAt: meal.createdAt,
      updated: meal.updatedAt,
      userId: meal.userId
    }))


    return userMeals
  }
}

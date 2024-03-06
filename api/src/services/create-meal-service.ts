import { Meal } from "../model/Meal"
import { User } from "../model/User"

interface MealRequest {
  title: string
  description: string,
  date: Date,
  isDiet: boolean,
  userId: string
}

interface MealResponse {
  id: string,
  title: string | null | undefined,
  description: string | null | undefined,
  date: Date,
  isDiet: boolean,
  userId: string | null | undefined
}

export class CreateMealService {
  async execute ({ title, description, date, isDiet, userId }: MealRequest) {
    const user = await User.findById({ _id: userId })

    if(!user) {
      throw new Error('Usuário não encontrado.')
    }

    const meal = await Meal.create({
      title, description, date, isDiet, userId
    })

    console.log(meal)

    return { meal }
  }
}

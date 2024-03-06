import { compare } from "bcrypt"
import { Meal } from "../model/Meal"
import { User } from "../model/User"

interface UserStatisticsRequest {
  userId: string
}

export class UserStatisticsService {
  async execute({ userId }: UserStatisticsRequest) {
    const user = await User.findById(userId)

    if(!user) {
      throw new Error('Usuário não encontrado')
    }

    const meals = await Meal.find({ userId }).sort({ date: 1 })

    const totalOfMeals = meals.length
    const mealsInDiet: number = meals.filter((meal) => meal.isDiet).length
    const mealsOutDiet = meals.filter((meal) => !meal.isDiet).length

    const bestSequenceOfMeals = meals.reduce((acc, meal) => {
      if (meal.isDiet) {
        acc.currentSequence++;
        acc.maxSequence = Math.max(acc.currentSequence, acc.maxSequence);
      } else {
        acc.currentSequence = 0;
      }
      return acc;
    }, { currentSequence: 0, maxSequence: 0 }).maxSequence;



    return  {
     total: totalOfMeals,
     inDiet: mealsInDiet,
     outDiet: mealsOutDiet,
     bestSequence: bestSequenceOfMeals
    }
  }
}

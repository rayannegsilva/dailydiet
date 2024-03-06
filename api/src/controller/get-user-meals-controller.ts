import { Request, Response } from "express";
import { GetUserMealService } from "../services/get-user-meal-service";


export class GetUserMealsController {
  async handler(req: Request, res: Response) {
      const userId = req.user_id
      const getUserMealsService = new GetUserMealService()

      try {
        const meals = await getUserMealsService.execute({ userId })

        return res.status(200).json(meals)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: error })
      }
  }
}

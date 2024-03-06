import { Request, Response } from "express";
import { GetMealByIDService } from "../services/get-meal-by-id-service";

export class GetMealByIDController {
  async handler (req: Request, res: Response) {
    try {
      const userId = req.user_id
      const { mealId } = req.params

      const getMealByIDService = new GetMealByIDService()

      const meal  = await getMealByIDService.execute({ userId, mealId })

      return res.status(200).json(meal)
    } catch (error) {
      console.log(error)
    }
  }
}

import { Request, Response } from "express";
import { EditMealService } from "../services/edit-meal-service";

export class EditMealController {
  async handler(req: Request, res: Response) {
    try {
      const { mealId } = req.params
      const { title, description, date, isDiet } = req.body
      const userId = req.user_id

      console.log(mealId)

      const editMealService = new EditMealService()

      const mealUpdate = await editMealService.execute({ userId, mealId, mealData: {title, description, date, isDiet }})

      return res.json(mealUpdate)
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

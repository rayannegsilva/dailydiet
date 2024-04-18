import { Request, Response } from "express";
import { DeleteMeaService } from "../services/delete-meal-service";

export class DeleteMealController {
  async handler (req: Request, res: Response) {
    try {
      const { mealId } = req.params
      const userId = req.user_id

      const deleteMealService = new DeleteMeaService ()

      await deleteMealService.execute({ mealId, userId })
      res.status(200).json({})

    } catch (error) {
      console.log("erro", error)
      return error
    }
  }
}

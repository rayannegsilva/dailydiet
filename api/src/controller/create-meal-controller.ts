import { Response, Request } from "express";
import { CreateMealService } from "../services/create-meal-service";

export class CreateMealController {
  async handler(req: Request, res: Response) {
    try {
      const { title, description, date, isDiet } = req.body
      const userId = req.user_id


      const createMealService = new CreateMealService()

      const meal = await createMealService.execute({
        title, description, date, isDiet, userId
      })

      res.status(201).json(meal)
    } catch (error) {
      console.error
    }
}}

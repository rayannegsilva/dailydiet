import { Request, Response } from "express";
import { UserStatisticsService } from "../services/statistics-service";

export class UserStatisticsController {
  async handler(req: Request, res: Response) {
    const userId = req.user_id

    try {
      const userStatisticsService = new UserStatisticsService()
      const userStatistics =  await userStatisticsService.execute({ userId })

      return res.status(200).json(userStatistics)
    } catch (error) {
      console.log(error)
    }
  }
}

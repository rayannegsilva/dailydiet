import { Request, Response } from "express";
import { GetUserService } from "../services/get-user-service";

export class GetUserController {
  async handler(req: Request, res: Response) {
    const userId = req.user_id

    try {
      const getUserService = new GetUserService()
      const user = await getUserService.execute({ userId })

      return res.status(200).json(user)

    } catch (error) {
      console.log(error)
    }
  }
}

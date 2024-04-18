import { Request, Response } from "express";
import { UpdatedUserService } from "../services/updated-user-service";

export class UpdatedUserController {
  async handler(req: Request, res: Response) {
    const userId = req.user_id
    const { oldPassword, newPassword, email } = req.body

    try {
      const updatedUser = new UpdatedUserService()

      const user = await updatedUser.execute({ userId, oldPassword, newPassword, email })

      return res.json(user)

    } catch (error) {
      console.log(error)
    }
  }
}

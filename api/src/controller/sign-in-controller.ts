import { Request, Response } from "express";
import { SignInService } from "../services/sign-in-service";

export class SignInController {
  async handler (req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const singInService = new SignInService()

      const auth = await singInService.execute({
        email, password
      })

      return res.json(auth)
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

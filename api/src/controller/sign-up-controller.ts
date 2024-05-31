import { Request, Response } from "express";
import { SignUpService } from "../services/sign-up-service";

class SignUpController {
  async handler(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body

      const signUpService = new SignUpService()

      const user = await signUpService.execute({
        email, password, name
      })

      console.log(user)

      return res.json(user)

    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export { SignUpController }

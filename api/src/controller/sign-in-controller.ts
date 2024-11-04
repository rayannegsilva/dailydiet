import { Request, Response } from "express";
import { SignInService } from "../services/sign-in-service";
import { ApiError } from "../helpers/api-error";

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
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
          status: error.statusCode,
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro interno do servidor. Tente novamente mais tarde.",
      });
    }
  }
}

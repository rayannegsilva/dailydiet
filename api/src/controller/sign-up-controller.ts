import { Request, Response } from "express";
import { SignUpService } from "../services/sign-up-service";
import { ApiError } from "../helpers/api-error";

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

export { SignUpController }

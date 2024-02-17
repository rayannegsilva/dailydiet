import { Controller } from "protocols/controller-protocol";
import { HttpRequest, HttpResponse } from "protocols/http-protocol";
import { Validation } from "protocols/validation-protocol";

export class SignUpController implements Controller {
  private readonly validation: Validation

  constructor (
    validation: Validation
  ) {
    this.validation = validation
  }

  execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
       const errorComposite: HttpResponse = {
        statusCode: 400,
        body: error
       }

       return Promise.reject(errorComposite)
      }

       const ok: HttpResponse = {
        statusCode: 200,
        body: 'oi'
       }

      return Promise.resolve(ok)
    } catch (error) {
      const errorComposite: HttpResponse = {
        statusCode: 400,
        body: error
       }
       return Promise.reject(errorComposite)
    }
  }
}

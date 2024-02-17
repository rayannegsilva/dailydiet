import { HttpRequest, HttpResponse } from "protocols/http-protocol";

export interface Controller {
  execute(httpRequest: HttpRequest): Promise<HttpResponse>
}

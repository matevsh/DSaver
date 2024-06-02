import { HttpResponse } from "../response/http-codes";

export class HttpError extends Error {
  constructor(public response: HttpResponse) {
    super();
  }
}

export interface IHttpError extends Error {
  message: string;
  code: number;
}

export class HttpError implements IHttpError {
  name: string;
  message: string;
  code: number;

  constructor(message: string, statusCode: number) {
    this.name = '';
    this.message = message;
    this.code = statusCode;
  }
}

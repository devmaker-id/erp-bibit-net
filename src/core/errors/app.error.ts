export class AppError extends Error {
  public readonly status: number;
  public readonly code: string;

  constructor(
    message: string,
    status = 400,
    code = "APP_ERROR"
  ) {
    super(message);

    this.name = new.target.name;

    this.status = status;
    this.code = code;

    Error.captureStackTrace?.(this, this.constructor);
  }
}
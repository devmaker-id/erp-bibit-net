export interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  code: string;
  errors?: unknown;
}

export type ActionResult<T> =
  | SuccessResponse<T>
  | ErrorResponse;

export const success = <T>(
  data: T,
  message = "Success"
): SuccessResponse<T> => ({
  success: true,
  message,
  data,
});

export const failure = (
  message: string,
  code: string,
  errors?: unknown
): ErrorResponse => ({
  success: false,
  message,
  code,
  errors,
});
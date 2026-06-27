export interface ActionSuccess<T = unknown> {
  success: true;
  message: string;
  data: T;
}

export interface ActionError {
  success: false;
  message: string;
  errors?: unknown;
}

export type ActionResult<T = unknown> =
  | ActionSuccess<T>
  | ActionError;

export function success<T>(
  message: string,
  data: T
): ActionSuccess<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function failure(
  message: string,
  errors?: unknown
): ActionError {
  return {
    success: false,
    message,
    errors,
  };
}
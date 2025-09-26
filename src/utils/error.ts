// Error handling utilities
export class AppError extends Error {
  constructor(
    message: string,
    public code?: string | number,
    public details?: unknown
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const getErrorMessage = (error: unknown): string => {
  if (isError(error)) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unknown error occurred";
};

export const handleApiError = (error: unknown): string => {
  if (isError(error)) {
    return error.message;
  }

  // Handle API response errors
  if (typeof error === "object" && error !== null) {
    const errorObj = error as Record<string, unknown>;
    if (typeof errorObj.message === "string") {
      return errorObj.message;
    }
    if (typeof errorObj.error === "string") {
      return errorObj.error;
    }
  }

  return "An unexpected error occurred";
};

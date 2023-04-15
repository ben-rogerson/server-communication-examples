import { ZodError } from "zod";

export function getErrorMessage(error: unknown): string {
  // Simplify Zod error messages
  if (error instanceof ZodError) {
    const zodErrors = Object.values(
      error.flatten((e) => e.message).fieldErrors
    ).join(" / ");
    return zodErrors;
  }

  if (error instanceof Error) return error.message;

  return String(error);
}

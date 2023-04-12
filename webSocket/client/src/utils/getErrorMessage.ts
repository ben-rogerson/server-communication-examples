export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;

  let message = "";
  try {
    message = JSON.parse(String(error));
    const errors = Array.isArray(message) ? message : [message];
    const errorList = errors.map((e) => e.message).join(" / ");
    return errorList;
  } catch {
    return String(error);
  }
}

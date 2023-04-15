export async function parseJson(response: Response) {
  // No content
  if (response.status === 204) return;

  // Okay
  if (response.status === 200) return await response.json();

  // Error
  const error = await response.json();
  throw new Error(error);
}

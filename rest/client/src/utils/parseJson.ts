export async function parseJson(response: Response) {
  // Return undefined if the response status is 204 (No Content)
  if (response.status === 204) return;

  // Throw an error if the response status is not 200
  if (response.status !== 200) {
    const res = await response.json();
    const errors = Array.isArray(res) ? res : [res];
    const errorList = errors.map((e: Error) => e.message).join(" / ");
    throw new Error(errorList);
  }

  return response.json();
}

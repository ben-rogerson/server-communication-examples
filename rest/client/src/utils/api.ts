import { parseJson } from "./parseJson";
import { API_URL } from "../constants";
import type { Flora } from "@serverTypes";

export const viewAllFlora = (): Promise<Flora[]> =>
  fetch(`${API_URL}/flora`).then(parseJson);

export const viewFlora = (id: Flora["id"]): Promise<Flora> =>
  fetch(`${API_URL}/flora/${id}`).then(parseJson);

export const addFlora = ({
  title,
  uses,
}: Pick<Flora, "title" | "uses">): Promise<Flora> =>
  fetch(`${API_URL}/flora`, {
    method: "POST",
    body: JSON.stringify({ title, uses }),
    headers: { "Content-Type": "application/json" },
  }).then(parseJson);

export const editFlora = ({ id, title, uses }: Flora): Promise<Flora> =>
  fetch(`${API_URL}/flora/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, uses }),
    headers: { "Content-Type": "application/json" },
  }).then(parseJson);

export const deleteFlora = (id: Flora["id"]): Promise<Flora> =>
  fetch(`${API_URL}/flora/${id}`, { method: "DELETE" }).then(parseJson);

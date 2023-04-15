import crypto from "crypto";
import flora from "./data.js";
import { type Flora, floraSchema } from "../schema.js";

export type Mutations = {
  addFlora(data: Required<Flora>): void;
  editFlora(data: Flora & Required<Pick<Flora, "id">>): Flora;
  deleteFlora(data: Required<Pick<Flora, "id">>): Flora;
};

export const mutations: Mutations = {
  addFlora(params) {
    floraSchema.omit({ id: true }).parse(params);

    flora.add({ ...params, id: crypto.randomUUID() });
  },

  editFlora(params) {
    floraSchema.parse(params);
    const foundFlora = [...flora].find((flora) => flora.id === params.id);
    if (!foundFlora) throw new Error(`Flora "${params.id}" not found`);

    flora.forEach((flora) => {
      if (flora.id === params.id) {
        flora.title = params.title ?? flora.title;
        flora.uses = params.uses ?? flora.uses;
      }
    });
    const updatedFlora = [...flora].find((flora) => flora.id === params.id)!;
    return updatedFlora;
  },

  deleteFlora(params) {
    floraSchema.pick({ id: true }).parse(params);

    const foundFlora = [...flora].find((flora) => flora.id === params.id);
    if (!foundFlora) throw new Error(`Flora "${params.id}" not found`);

    flora.delete(foundFlora);
    return foundFlora;
  },
};

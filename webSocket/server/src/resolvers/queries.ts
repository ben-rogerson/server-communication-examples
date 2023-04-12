import flora from "./data.js";
import { type Flora, floraSchema } from "../schema.js";

export type Queries = {
  getAllFlora(): Flora[];
  getFlora(data: { id: Flora["id"] }): Flora;
};

export const queries: Queries = {
  getAllFlora: () => [...flora],

  getFlora: (data) => {
    floraSchema.pick({ id: true }).parse(data);

    const foundFlora = [...flora].find((flora) => flora.id === data.id);
    if (!foundFlora) throw new Error(`Flora "${data.id}" not found`);

    return foundFlora;
  },
};

import flora from "./data.js";
import { type Flora, floraSchema } from "../schema.js";
import type { Request, Response } from "express";

type Queries = {
  getAllFlora(request: Request, response: Response<Flora[]>): void;
  getFlora(
    request: Request<{ id: Flora["id"] }>,
    response: Response<Flora>
  ): void;
};

export const queries: Queries = {
  getAllFlora: (_, req) => {
    req.send([...flora]);
  },

  getFlora: ({ params }, req) => {
    floraSchema.pick({ id: true }).parse(params);
    const foundFlora = [...flora].find((flora) => flora.id === params.id);
    if (!foundFlora) throw new Error(`Flora "${params.id}" not found`);
    req.send(foundFlora);
  },
};

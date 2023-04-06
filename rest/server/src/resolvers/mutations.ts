import crypto from "crypto";
import flora from "./data.js";
import { type Flora, floraSchema } from "../schema.js";
import type { Request, Response } from "express";

type Mutations = {
  addFlora(request: Request<{ id: Flora["id"] }>, response: Response): void;
  editFlora(request: Request<Flora>, response: Response<Flora>): void;
  deleteFlora(
    request: Request<{ id: Flora["id"] }>,
    response: Response<Flora>
  ): void;
};

export const mutations: Mutations = {
  addFlora({ body }, req) {
    floraSchema.omit({ id: true }).parse(body);

    flora.add({ ...body, id: crypto.randomUUID() });
    req.sendStatus(204);
  },

  editFlora({ params, body }, req) {
    floraSchema.pick({ id: true }).parse(params);
    floraSchema.omit({ id: true }).parse(body);
    const foundFlora = [...flora].find((flora) => flora.id === params.id);
    if (!foundFlora) throw new Error(`Flora "${params.id}" not found`);

    flora.forEach((flora) => {
      if (flora.id === params.id) {
        flora.title = body.title ?? flora.title;
        flora.uses = body.uses ?? flora.uses;
      }
    });
    const updatedFlora = [...flora].find((flora) => flora.id === params.id);
    req.send(updatedFlora);
  },

  deleteFlora({ params }, req) {
    floraSchema.pick({ id: true }).parse(params);

    const foundFlora = [...flora].find((flora) => flora.id === params.id);
    if (!foundFlora) throw new Error(`Flora "${params.id}" not found`);

    flora.delete(foundFlora);
    req.send(foundFlora);
  },
};

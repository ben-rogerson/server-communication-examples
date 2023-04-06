import crypto from "crypto";
import { TRPCError } from "@trpc/server";
import t from "../utils/trpc.js";
import flora from "./data.js";
import { floraSchema } from "../schema.js";

const mutations = {
  addFlora: t.procedure
    .input(floraSchema.omit({ id: true }))
    .mutation(({ input }) => {
      flora.add({ ...input, id: crypto.randomUUID() });
    }),

  editFlora: t.procedure.input(floraSchema).mutation(({ input }) => {
    const foundFlora = [...flora].find((flora) => flora.id === input.id);
    if (!foundFlora)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Flora "${input.id}" not found`,
      });

    flora.forEach((flora) => {
      if (flora.id === input.id) {
        flora.title = input.title ?? flora.title;
        flora.uses = input.uses ?? flora.uses;
      }
    });
    return [...flora].find((flora) => flora.id === input.id);
  }),

  deleteFlora: t.procedure.input(floraSchema.shape.id).mutation(({ input }) => {
    const foundFlora = [...flora].find((flora) => flora.id === input);
    if (!foundFlora)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Flora "${input}" not found`,
      });

    flora.delete(foundFlora);
    return foundFlora;
  }),
};

export default mutations;

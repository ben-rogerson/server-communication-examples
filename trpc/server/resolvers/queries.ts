import { TRPCError } from "@trpc/server";
import t from "../utils/trpc.js";
import flora from "./data.js";
import { floraSchema } from "../schema.js";

const queries = {
  getAllFlora: t.procedure.query(() => [...flora]),

  getFlora: t.procedure.input(floraSchema.shape.id).query((req) => {
    const foundFlora = [...flora].find((flora) => flora.id === req.input);

    if (!foundFlora)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Flora "${req.input}" not found`,
      });

    return foundFlora;
  }),
};

export default queries;

import { z } from "zod";
import { GraphQLError } from "graphql";
import { Resolvers } from "../generated/resolvers-types";
import florae from "./data.js";
import { floraSchema } from "../schema.js";

export const queries: Resolvers = {
  Query: {
    getAllFlora: () => [...florae],

    getFlora: (_, data) => {
      floraSchema.pick({ id: true }).parse(data);
      const foundFlora = [...florae].find((flora) => flora.id === data.id);
      if (!foundFlora)
        throw new GraphQLError(`Flora "${data.id}" not found`, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      return foundFlora;
    },
  },
};

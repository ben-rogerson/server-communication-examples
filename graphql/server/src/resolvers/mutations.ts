import { z } from "zod";
import crypto from "crypto";
import { GraphQLError } from "graphql";
import { Resolvers } from "../generated/resolvers-types";
import flora from "./data.js";
import { floraSchema } from "../schema.js";

export const mutations: Resolvers = {
  Mutation: {
    addFlora(_, data) {
      floraSchema.omit({ id: true }).parse(data);

      const newFlora = { ...data, id: crypto.randomUUID() };
      flora.add(newFlora);
      return newFlora;
    },

    editFlora(_, data) {
      floraSchema.parse(data);
      const foundFlora = [...flora].find((flora) => flora.id === data.id);
      if (!foundFlora)
        throw new GraphQLError(`Flora "${data.id}" not found`, {
          extensions: { code: "BAD_USER_INPUT" },
        });

      flora.forEach((flora) => {
        if (flora.id === data.id) {
          flora.title = data.title ?? flora.title;
          flora.uses = data.uses ?? flora.uses;
        }
      });
      const updatedFlora = [...flora].find((flora) => flora.id === data.id)!;
      return updatedFlora;
    },

    deleteFlora(_, data) {
      floraSchema.pick({ id: true }).parse(data);

      const foundFlora = [...flora].find((flora) => flora.id === data.id);
      if (!foundFlora)
        throw new GraphQLError(`Flora "${data.id}" not found`, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      flora.delete(foundFlora);
      return foundFlora;
    },
  },
};

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { queries } from "./resolvers/queries.js";
import { mutations } from "./resolvers/mutations.js";

const server = new ApolloServer({
  typeDefs: readFileSync("./src/schema.graphql", { encoding: "utf-8" }),
  resolvers: { ...queries, ...mutations },
  formatError: (formattedError) => {
    let message = "";
    try {
      message = JSON.parse(formattedError.message);
    } catch {
      message = formattedError.message;
    }

    if (typeof message === "string") return { ...formattedError, message };

    // Simplify Zod error messages
    const errors = Array.isArray(message) ? message : [message];
    const errorList = errors.map((e: Error) => e.message).join(" / ");
    return { ...formattedError, message: errorList };
  },
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 GraphQL server listening at ${url}`);

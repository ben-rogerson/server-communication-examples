import cors from "cors";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import mutations from "./resolvers/mutations.js";
import queries from "./resolvers/queries.js";
import t from "./utils/trpc.js";

const appRouter = t.router({ ...queries, ...mutations });

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
}).listen(2022);

console.log(`🚀 Server ready at http://localhost:${server.port}`);

export type AppRouter = typeof appRouter;
export { appRouter, t };

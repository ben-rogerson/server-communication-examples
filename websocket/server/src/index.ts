import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { type Queries, queries } from "./resolvers/queries.js";
import { type Mutations, mutations } from "./resolvers/mutations.js";
import { getErrorMessage } from "./utils/getErrorMessage.js";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
});
const port = 4000;

const listeners = (socket: Socket) =>
  socket
    .on("getAllFlora", (cb) => {
      try {
        cb(queries.getAllFlora());
      } catch (error) {
        cb(null, getErrorMessage(error));
      }
    })
    .on("getFlora", (params: Parameters<Queries["getFlora"]>[0], cb) => {
      try {
        cb(queries.getFlora(params));
      } catch (error) {
        cb(null, getErrorMessage(error));
      }
    })
    .on("addFlora", (params: Parameters<Mutations["addFlora"]>[0], cb) => {
      try {
        cb(mutations.addFlora(params));
      } catch (error) {
        cb(null, getErrorMessage(error));
      }
    })
    .on("editFlora", (params: Parameters<Mutations["editFlora"]>[0], cb) => {
      try {
        cb(mutations.editFlora(params));
      } catch (error) {
        cb(null, getErrorMessage(error));
      }
    })
    .on(
      "deleteFlora",
      (params: Parameters<Mutations["deleteFlora"]>[0], cb) => {
        try {
          cb(mutations.deleteFlora(params));
        } catch (error) {
          cb(null, getErrorMessage(error));
        }
      }
    );

io.on("connection", listeners);

httpServer.listen(port);

console.log(`🚀 Socket server listening at http://localhost:${port}`);

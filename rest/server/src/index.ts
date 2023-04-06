import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { queries } from "./resolvers/queries.js";
import { mutations } from "./resolvers/mutations.js";

const errorResponder = (
  error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.header("Content-Type", "application/json");
  const status = error.statusCode || 400;

  try {
    JSON.parse(error.message);
    response.status(status).send(error.message);
  } catch {
    response.status(status).send(JSON.stringify({ message: error.message }));
  }
};

const port = 4000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/flora", queries.getAllFlora);
app.get("/api/flora/:id", queries.getFlora);

app.post("/api/flora", mutations.addFlora);
app.put("/api/flora/:id", mutations.editFlora);
app.delete("/api/flora/:id", mutations.deleteFlora);

app.use(errorResponder);

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});

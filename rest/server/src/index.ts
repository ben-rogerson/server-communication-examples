import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { queries } from "./resolvers/queries.js";
import { mutations } from "./resolvers/mutations.js";
import { ZodError } from "zod";

const errorResponder = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.header("Content-Type", "application/json");
  const status = 400;

  // Simplify Zod error messages
  if (error instanceof ZodError) {
    const zodErrors = Object.values(
      error.flatten((e) => e.message).fieldErrors
    ).join(" / ");
    return response.status(status).send(JSON.stringify(zodErrors));
  }

  if (error instanceof Error)
    return response.status(status).send(JSON.stringify(error.message));

  response.status(status).send(JSON.stringify(error));
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
  console.log(`🚀 Rest server listening at http://localhost:${port}`);
});

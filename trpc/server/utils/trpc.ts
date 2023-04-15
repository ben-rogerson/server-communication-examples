import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";

const t = initTRPC.create({
  errorFormatter({ shape, error }) {
    // Simplify Zod error messages
    if (error.cause instanceof ZodError) {
      const { formErrors, fieldErrors } = error.cause.flatten((e) => e.message);
      const zodErrors = Object.values({ ...formErrors, ...fieldErrors }).join(
        " / "
      );
      return { ...shape, message: zodErrors };
    }

    return shape;
  },
});

export default t;

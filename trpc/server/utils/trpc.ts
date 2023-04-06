import { initTRPC } from "@trpc/server";

const t = initTRPC.create({
  errorFormatter({ shape, error }) {
    let message = "";

    try {
      message = JSON.parse(error.message);
    } catch {
      message = error.message;
    }

    if (typeof message === "string") return { ...shape, message };

    const errors = Array.isArray(message) ? message : [message];
    const errorList = errors.map((e: Error) => e.message).join(" / ");
    return { ...shape, message: errorList };
  },
});

export default t;

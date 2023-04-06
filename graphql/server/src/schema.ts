import { z } from "zod";

const floraSchema = z.object({
  id: z.string().uuid("The supplied id is invalid"),
  title: z.string().nonempty("Title cannot be empty"),
  uses: z.string().nonempty("Uses cannot be empty"),
});

export { floraSchema };

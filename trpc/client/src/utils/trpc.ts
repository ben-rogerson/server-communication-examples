import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@serverRouter";

export const trpc = createTRPCReact<AppRouter>();

import { usersRouter } from "@/modules/auth/server/procedures";
import { recordsRouter } from "@/modules/dashboard/server/procedures";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  records: recordsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

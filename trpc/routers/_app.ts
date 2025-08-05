import { db } from "@/db";
import { users } from "@/db/schema";
import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  allUsers: baseProcedure.query(async (opts) => {
    return await db.select().from(users);
  }),
  user: baseProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const user = await db.query.users.findMany({
        where: (users, { eq }) => eq(users.clerkId, input.userId),
      });
      return user[0];
    }),
  userWithRecords: baseProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const user = await db.query.users.findMany({
        where: (users, { eq }) => eq(users.clerkId, input.userId),
        with: {
          records: true,
        },
      });

      return user[0];
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

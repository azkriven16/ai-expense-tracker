import { db } from "@/db";
import { users } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  allUsers: baseProcedure.query(async (opts) => {
    return await db.select().from(users);
  }),
  currentUser: baseProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not authenticated",
      });
    }

    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.clerkId, userId),
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return user;
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

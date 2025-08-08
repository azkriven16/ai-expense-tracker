import { db } from "@/db";
import { users } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const usersRouter = createTRPCRouter({
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
});

import { db } from "@/db";
import { records } from "@/db/schema";
import { createRecordSchema } from "@/modules/dashboard/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const recordsRouter = createTRPCRouter({
  createRecord: baseProcedure
    .input(createRecordSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth.userId;

      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated",
        });
      }

      try {
        const newRecord = await db.insert(records).values({
          amount: input.amount,
          text: input.text,
          userId: userId,
          date: input.date || new Date(),
        });

        return newRecord;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create record",
        });
      }
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

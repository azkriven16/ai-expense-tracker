import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  test: baseProcedure.query(async ({ ctx }) => {
    const { userId } = ctx.auth;

    if (!userId) {
      return {
        greeting: "Hello! You are not signed in.",
      };
    }

    return {
      greeting: `Hello ${userId}!`,
    };
  }),
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async (opts) => {
      return {
        greeting: `${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;

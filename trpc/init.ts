import { initTRPC } from "@trpc/server";
import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { Context } from "./context";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  return { auth: await auth() };
});

const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

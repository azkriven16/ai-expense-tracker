import { db } from "@/db";
import { records } from "@/db/schema";
import { generateAIAnswer, generateExpenseInsights } from "@/lib/ai";
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
      const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.clerkId, input.userId),
        with: {
          records: true,
        },
      });

      return user;
    }),
  aiInsights: baseProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not authenticated",
      });
    }
    try {
      // Get user's recent expenses (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const expenses = await db.query.records.findMany({
        where: (records, { eq, gte }) =>
          eq(records.userId, userId) && gte(records.date, thirtyDaysAgo),
        orderBy: (records, { desc }) => desc(records.date),
        limit: 50, // Limit to last 50 records for performance
      });

      if (expenses.length === 0) {
        // Return default insights for new users
        return [
          {
            id: "welcome-1",
            type: "info",
            title: "Welcome to ExpenseTracker AI!",
            message:
              "Start adding your expenses to get personalized AI insights about your spending patterns.",
            action: "Add your first expense",
            confidence: 1.0,
          },
          {
            id: "welcome-2",
            type: "tip",
            title: "Track Regularly",
            message:
              "For best results, try to log expenses daily. This helps our AI provide more accurate insights.",
            action: "Set daily reminders",
            confidence: 1.0,
          },
        ];
      }

      // Convert to format expected by AI
      const expenseData = expenses.map((expense) => ({
        id: expense.id,
        amount: expense.amount,
        category: expense.category || "Other",
        description: expense.text,
        date: expense.createdAt.toISOString(),
      }));

      // Generate AI insights
      const insights = await generateExpenseInsights(expenseData);
      return insights;
    } catch (error) {
      console.error("Error getting AI insights:", error);

      // Return fallback insights
      return [
        {
          id: "error-1",
          type: "warning",
          title: "Insights Temporarily Unavailable",
          message:
            "We're having trouble analyzing your expenses right now. Please try again in a few minutes.",
          action: "Retry analysis",
          confidence: 0.5,
        },
      ];
    }
  }),
  generateInsightAnswer: baseProcedure
    .input(
      z.object({
        question: z.string().min(1, "Question is required"),
        insightId: z.string().min(1, "Insight ID is required"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth.userId;

      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated",
        });
      }

      try {
        // Get user's recent expenses (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const expenses = await db.query.records.findMany({
          where: (records, { eq, gte }) =>
            eq(records.userId, userId) && gte(records.date, thirtyDaysAgo),
          orderBy: (records, { desc }) => desc(records.date),
          limit: 50, // Limit to last 50 records for performance
        });

        // Convert to format expected by AI
        const expenseData = expenses.map((expense) => ({
          id: expense.id,
          amount: expense.amount,
          category: expense.category || "Other",
          description: expense.text,
          date: expense.createdAt.toISOString(),
        }));

        const answer = await generateAIAnswer(
          input.question,
          expenseData,
          input.insightId
        );
        return answer;
      } catch (error) {
        console.error("Error generating insight answer:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate AI answer. Please try again.",
        });
      }
    }),
});

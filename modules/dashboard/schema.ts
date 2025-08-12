import { categories } from "@/db/schema";
import z from "zod";

export const createRecordSchema = z.object({
  text: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  category: z
    .enum(categories as [string, ...string[]])
    .refine((val) => !!val, { message: "Please select a category" }),
  date: z.date(),
  userId: z.string().min(1, "User ID is required"),
});

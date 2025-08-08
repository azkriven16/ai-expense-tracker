import { relations } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTable,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  clerkId: text("clerkId").notNull().unique(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  photo: text("photo").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const categoryEnum = pgEnum("category", [
  "🍔 Food & Dining",
  "🚌 Transportation",
  "🛍️ Shopping",
  "🎬 Entertainment",
  "💡 Bills & Utilities",
  "🩺 Healthcare",
  "✈️ Travel",
  "🎓 Education",
  "💼 Business",
  "🔖 Other",
]);

export const records = pgTable(
  "records",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    text: text("text").notNull(),
    amount: real("amount").notNull(),
    category: categoryEnum("category").notNull().default("🔖 Other"),
    date: timestamp("date").notNull().defaultNow(),
    userId: text("userId")
      .notNull()
      .references(() => users.clerkId, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("records_userId_idx").on(table.userId),
  })
);

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  records: many(records),
}));

export const recordsRelations = relations(records, ({ one }) => ({
  user: one(users, {
    fields: [records.userId],
    references: [users.clerkId],
  }),
}));

// Export types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserInput = Omit<NewUser, "id" | "createdAt" | "updatedAt">;

export type Record = typeof records.$inferSelect;
export type NewRecord = typeof records.$inferInsert;
export type RecordInput = Omit<NewRecord, "id" | "createdAt">;

export const categories = categoryEnum.enumValues;

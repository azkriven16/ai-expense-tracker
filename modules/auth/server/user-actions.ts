"use server";

import { db } from "@/db";
import { UserInput, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const addUser = async (user: UserInput) => {
  await db
    .insert(users)
    .values({
      clerkId: user.clerkId,
      email: user.email,
      name: user.name!,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
    })
    .returning({ clerkClientId: users.clerkId });
};

export const updateUser = async (
  clerkId: string,
  updatedData: Partial<UserInput>
) => {
  const result = await db
    .update(users)
    .set({
      ...updatedData,
      updatedAt: new Date(),
    })
    .where(eq(users.clerkId, clerkId))
    .returning();

  return result[0];
};

export const deleteUser = async (clerkId: string) => {
  const result = await db
    .delete(users)
    .where(eq(users.clerkId, clerkId))
    .returning();

  return result[0];
};

export const updateUserById = async (
  userId: number,
  updatedData: Partial<UserInput>
) => {
  const result = await db
    .update(users)
    .set({
      ...updatedData,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning();

  return result[0];
};

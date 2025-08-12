"use client";

import { useTRPC } from "@/trpc/client";
import { CreateRecordForm } from "../ui/create-record-form";
import { useSuspenseQuery } from "@tanstack/react-query";

export const CreateRecordView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.users.currentUser.queryOptions());

  return <CreateRecordForm userId={data.clerkId} />;
};

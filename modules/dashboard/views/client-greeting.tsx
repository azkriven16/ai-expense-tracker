"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function ClientGreeting() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.test.queryOptions());
  return <div className="bg-red-500">{JSON.stringify(data, null, 2)} once</div>;
}

"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function ClientGreeting() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.hello.queryOptions({
      text: "hello",
    })
  );
  return <div>{data.greeting} once</div>;
}

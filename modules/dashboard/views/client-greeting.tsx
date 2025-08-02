"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Announcement from "../ui/announcement";

export function ClientGreeting() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.test.queryOptions());
  return (
    <section>
      <Announcement />
      <div className="">{JSON.stringify(data, null, 2)} once</div>
    </section>
  );
}

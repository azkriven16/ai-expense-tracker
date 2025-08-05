"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRelativeTime } from "@/lib/utils";

export function ClientGreeting() {
  const { userId } = useAuth();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.user.queryOptions({
      userId: userId!,
    })
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Card>
          <div className="p-2">
            <div className="flex justify-between">
              <h1>Welcome Back, {data.name}!</h1>
              <div className="">{getRelativeTime(data?.createdAt)}</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Here's a quick overview of your recent expense activity. Track
              your spending, analyze patterns, and manage your budget
              efficiently!
            </p>
            <Avatar>
              <AvatarImage src={data.photo} />
              <AvatarFallback>
                {data.firstName?.[0]}
                {data.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </Card>
      </div>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}

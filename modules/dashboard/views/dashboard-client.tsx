"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRelativeTime } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ExpenseChartCard } from "../ui/expense-chart-card";

export function DashboardClient() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.users.currentUser.queryOptions());

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="bg-secondary h-fit">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Welcome Back, {data.name}</CardTitle>
              <div className="text-xs font-medium">
                Joined {getRelativeTime(data?.createdAt)}
              </div>
            </div>
            <CardDescription className="mt-2 text-xs text-muted-foreground">
              Here's a quick overview of your recent expense activity. Track
              your spending, analyze patterns, and manage your budget
              efficiently!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardAction className="flex justify-between w-full">
              <Button size="sm">Add new Expense</Button>
              <Button size="sm">AI Advice</Button>
            </CardAction>
          </CardContent>
        </Card>
        <ExpenseChartCard />
      </div>
    </>
  );
}

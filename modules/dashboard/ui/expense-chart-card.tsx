"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

export const description = "An expense chart";

const chartData = [
  { date: "2024-01-15", amount: 1250, displayDate: "Jan 15, 2024" },
  { date: "2024-02-10", amount: 2100, displayDate: "Feb 10, 2024" },
  { date: "2024-03-22", amount: 980, displayDate: "Mar 22, 2024" },
  { date: "2024-04-05", amount: 650, displayDate: "Apr 5, 2024" },
  { date: "2024-05-18", amount: 1800, displayDate: "May 18, 2024" },
  { date: "2024-06-30", amount: 1450, displayDate: "Jun 30, 2024" },
];

const chartConfig = {
  amount: {
    label: "Amount ($)",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

const CustomTooltipContent = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Date
            </span>
            <span className="font-bold text-muted-foreground">
              {data.displayDate}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Amount
            </span>
            <span className="font-bold">
              ${payload[0]?.value?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function ExpenseChartCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Chart</CardTitle>
        <CardDescription>
          <div className="flex gap-2 leading-none font-medium">
            Total expenses decreased by 8.3% this month{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", { month: "short" });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <ChartTooltip cursor={false} content={<CustomTooltipContent />} />
            <Bar dataKey="amount" fill=" var(--foreground)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing total expenses for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

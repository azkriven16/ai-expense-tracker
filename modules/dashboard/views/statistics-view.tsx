"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Activity,
  DollarSign,
  FileText,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartDataPoint {
  name: string;
  amount: number;
  date: string;
  fullText: string;
}

interface PieChartDataPoint {
  name: string;
  value: number;
  percentage: string;
}

interface AreaChartDataPoint {
  date: string;
  amount: number;
  count: number;
}

const CHART_COLORS = [
  "#3B82F6", // blue-500
  "#10B981", // emerald-500
  "#F59E0B", // amber-500
  "#EF4444", // red-500
  "#8B5CF6", // violet-500
  "#06B6D4", // cyan-500
  "#84CC16", // lime-500
] as const;

interface UserStatisticsProps {
  userId: string;
}

export function StatisticsView({ userId }: UserStatisticsProps) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.records.userWithRecords.queryOptions({
      userId,
    })
  );

  // Early return if no data
  if (!data?.records || data.records.length === 0) {
    return (
      <div className="max-w-md mx-auto p-4">
        <Card className="text-center py-8">
          <CardContent className="pt-4">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <CardTitle className="text-lg mb-2">
              No Financial Data Available
            </CardTitle>
            <CardDescription className="text-sm">
              Start adding transactions to see your financial statistics.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate statistics with type safety
  const totalAmount = data.records.reduce(
    (sum, record) => sum + record.amount,
    0
  );
  const avgAmount: number = totalAmount / data.records.length;

  const maxAmount: number = Math.max(...data.records.map((r) => r.amount));
  const minAmount: number = Math.min(...data.records.map((r) => r.amount));

  // Prepare chart data with proper typing
  const barData: ChartDataPoint[] = data.records.slice(0, 6).map((record) => ({
    name:
      record.text.length > 10
        ? record.text.substring(0, 10) + "..."
        : record.text,
    amount: record.amount,
    date: format(new Date(record.date), "MMM dd"),
    fullText: record.text,
  }));

  // Line chart data for cumulative spending
  const sortedRecords = [...data.records].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const lineData = sortedRecords.reduce<
    {
      transaction: number;
      amount: number;
      cumulative: number;
      date: string;
      text: string;
    }[]
  >((acc, record, index) => {
    const cumulative =
      index === 0 ? record.amount : acc[index - 1].cumulative + record.amount;
    acc.push({
      transaction: index + 1,
      amount: record.amount,
      cumulative: cumulative,
      date: format(new Date(record.date), "MMM dd"),
      text: record.text,
    });
    return acc;
  }, []);

  // Pie chart data for category distribution
  const categoryData = data.records.reduce<Record<string, number>>(
    (acc, record) => {
      const category: string = record.category;
      acc[category] = (acc[category] || 0) + record.amount;
      return acc;
    },
    {}
  );

  const pieData: PieChartDataPoint[] = Object.entries(categoryData).map(
    ([category, amount]) => ({
      name: category,
      value: amount as number,
      percentage: (((amount as number) / totalAmount) * 100).toFixed(1),
    })
  );

  // Area chart data for daily spending
  const dailySpending = data.records.reduce<Record<string, number>>(
    (acc, record) => {
      const date: string = format(new Date(record.date), "MMM dd");
      acc[date] = (acc[date] || 0) + record.amount;
      return acc;
    },
    {}
  );

  const areaData: AreaChartDataPoint[] = Object.entries(dailySpending)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, amount]) => ({
      date,
      amount: amount as number,
      count: data.records.filter(
        (r) => format(new Date(r.date), "MMM dd") === date
      ).length,
    }));

  return (
    <div className="space-y-4">
      {/* Summary Cards - Compact Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              Total
            </span>
            <DollarSign className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="text-lg font-bold">${totalAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {data.records.length} transactions
          </p>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              Average
            </span>
            <Target className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="text-lg font-bold">${avgAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Per transaction</p>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              Highest
            </span>
            <TrendingUp className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="text-lg font-bold">${maxAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Maximum</p>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              Lowest
            </span>
            <TrendingDown className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="text-lg font-bold">${minAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Minimum</p>
        </Card>
      </div>

      {/* Charts Grid - 2x2 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar Chart - Recent Transactions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Transactions</CardTitle>
            <CardDescription className="text-xs">
              Last {Math.min(6, data.records.length)} transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    fontSize={10}
                    className="text-muted-foreground"
                  />
                  <YAxis className="text-muted-foreground" fontSize={10} />
                  <Tooltip
                    formatter={(value: number) => [`$${value}`, "Amount"]}
                    labelFormatter={(label: string, payload: any) => {
                      if (payload && payload[0]) {
                        return `${payload[0].payload.fullText} (${payload[0].payload.date})`;
                      }
                      return label;
                    }}
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="amount"
                    fill="var(--primary)"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Category Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Spending by Category</CardTitle>
            <CardDescription className="text-xs">
              Distribution breakdown
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percentage }: PieChartDataPoint) =>
                      `${percentage}%`
                    }
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    fontSize={10}
                  >
                    {pieData.map((entry: PieChartDataPoint, index: number) => (
                      <Cell key={`cell-${index}`} fill="var(--primary)" />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`$${value}`, "Amount"]}
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Line Chart - Cumulative Spending */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Cumulative Spending</CardTitle>
            <CardDescription className="text-xs">
              Running total trend
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lineData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="date"
                    className="text-muted-foreground"
                    fontSize={10}
                  />
                  <YAxis className="text-muted-foreground" fontSize={10} />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `$${value}`,
                      name === "cumulative"
                        ? "Cumulative Total"
                        : "Transaction Amount",
                    ]}
                    labelFormatter={(label: string) => `Date: ${label}`}
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulative"
                    stroke="var(--foreground)"
                    strokeWidth={2}
                    dot={{ r: 2, fill: "var(--foreground)" }}
                    activeDot={{ r: 4, fill: "var(--foreground)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Area Chart - Daily Spending */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Daily Spending</CardTitle>
            <CardDescription className="text-xs">
              Amount per day
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={areaData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="date"
                    className="text-muted-foreground"
                    fontSize={10}
                  />
                  <YAxis className="text-muted-foreground" fontSize={10} />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      name === "amount" ? `$${value}` : value,
                      name === "amount" ? "Amount" : "Transactions",
                    ]}
                    labelFormatter={(label: string) => `Date: ${label}`}
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="var(--primary)"
                    fill="var(--primary)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Summary - Compact */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="h-4 w-4" />
            Category Breakdown
          </CardTitle>
          <CardDescription className="text-xs">
            Spending by category
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1">
            {pieData.map((category: PieChartDataPoint, index: number) => (
              <Badge
                key={category.name}
                variant="secondary"
                className="text-xs px-2 py-0.5"
                style={{
                  backgroundColor: `${
                    CHART_COLORS[index % CHART_COLORS.length]
                  }20`,
                  borderColor: CHART_COLORS[index % CHART_COLORS.length],
                }}
              >
                {category.name}: ${category.value.toFixed(2)} (
                {category.percentage}%)
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

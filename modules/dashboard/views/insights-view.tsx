"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  BotIcon,
  CheckCircle,
  Info,
  Lightbulb,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface InsightData {
  id: string;
  type: "warning" | "info" | "success" | "tip";
  title: string;
  message: string;
  action?: string;
  confidence?: number;
}

interface AIAnswer {
  insightId: string;
  answer: string;
  isLoading: boolean;
}

export const InsightsView = () => {
  const trpc = useTRPC();
  const [aiAnswers, setAiAnswers] = useState<AIAnswer[]>([]);

  const {
    data: insights = [],
    isLoading,
    refetch,
    dataUpdatedAt,
    error,
  } = useQuery(trpc.records.aiInsights.queryOptions());

  const { mutate: generateAnswer, isPending } = useMutation(
    trpc.records.generateInsightAnswer.mutationOptions({
      onMutate: ({ insightId }) => {
        setAiAnswers((prev) => [
          ...prev.filter((a) => a.insightId !== insightId),
          {
            insightId,
            answer: "",
            isLoading: true,
          },
        ]);
      },
      onSuccess: (answer, { insightId }) => {
        setAiAnswers((prev) =>
          prev.map((a) =>
            a.insightId === insightId ? { ...a, answer, isLoading: false } : a
          )
        );
      },
      onError: (error, { insightId }) => {
        console.error("❌ Failed to generate AI answer:", error);
        setAiAnswers((prev) =>
          prev.map((a) =>
            a.insightId === insightId
              ? {
                  ...a,
                  answer:
                    "Sorry, I couldn't generate an answer. Please try again.",
                  isLoading: false,
                }
              : a
          )
        );
      },
    })
  );

  const handleActionClick = async (insight: InsightData) => {
    if (!insight.action) return;

    const existingAnswer = aiAnswers.find((a) => a.insightId === insight.id);
    if (existingAnswer && !existingAnswer.isLoading) {
      // Toggle functionality - remove existing answer
      setAiAnswers((prev) => prev.filter((a) => a.insightId !== insight.id));
      return;
    }

    const question = `${insight.title}: ${insight.action}`;

    generateAnswer({
      question,
      insightId: insight.id,
    });
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "tip":
        return <Lightbulb className="h-4 w-4" />;
      case "info":
        return <Info className="h-4 w-4" />;
      default:
        return <BotIcon className="h-4 w-4" />;
    }
  };

  const getInsightVariant = (
    type: string
  ): "default" | "destructive" | "outline" | "secondary" => {
    switch (type) {
      case "warning":
        return "outline";
      case "success":
        return "default";
      case "tip":
        return "secondary";
      case "info":
        return "outline";
      default:
        return "default";
    }
  };

  const formatLastUpdated = () => {
    if (!dataUpdatedAt) return "Loading...";

    const now = new Date();
    const lastUpdated = new Date(dataUpdatedAt);
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    return lastUpdated.toLocaleDateString();
  };

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Failed to load insights. Please try refreshing the page.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <BotIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">AI Insights</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Analyzing your spending patterns
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
              <span className="text-sm text-blue-600 font-medium">
                Analyzing...
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow-lg">
              <BotIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">AI Insights</CardTitle>
              <p className="text-sm text-muted-foreground">
                AI-powered financial analysis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              {formatLastUpdated()}
            </Badge>
            <Button
              onClick={() => refetch()}
              disabled={isLoading}
              size="sm"
              variant="outline"
              className="gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? (
          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              No insights available yet. Add some expenses to get personalized
              AI analysis.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {insights.map((insight) => {
              const currentAnswer = aiAnswers.find(
                (a) => a.insightId === insight.id
              );

              return (
                <Card
                  key={insight.id}
                  className="relative overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                          insight.type === "warning"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : insight.type === "success"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                            : insight.type === "tip"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {getInsightIcon(insight.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">
                            {insight.title}
                          </h4>
                          {insight.confidence && insight.confidence < 0.8 && (
                            <Badge variant="secondary" className="text-xs">
                              Preliminary
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {insight.message}
                        </p>
                      </div>
                    </div>

                    {insight.action && (
                      <Button
                        onClick={() =>
                          handleActionClick(insight as InsightData)
                        }
                        variant={getInsightVariant(insight.type)}
                        size="sm"
                        className="w-full gap-2"
                        disabled={currentAnswer?.isLoading || isPending}
                      >
                        {currentAnswer?.isLoading ? (
                          <>
                            <RefreshCw className="h-3 w-3 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            {insight.action}
                            {currentAnswer ? " ↑" : " →"}
                          </>
                        )}
                      </Button>
                    )}

                    {currentAnswer && (
                      <Card className="mt-3 bg-muted/50">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
                              <BotIcon className="h-3 w-3 text-white" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-sm mb-1">
                                AI Answer:
                              </h5>
                              {currentAnswer.isLoading ? (
                                <div className="space-y-1">
                                  <Skeleton className="h-3 w-full" />
                                  <Skeleton className="h-3 w-3/4" />
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {currentAnswer.answer}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

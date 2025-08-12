"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { EditIcon, FileText, Trash2Icon } from "lucide-react";

interface HistoryViewProps {
  userId: string;
}

export function HistoryView({ userId }: HistoryViewProps) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.records.userWithRecords.queryOptions({
      userId,
    })
  );

  // Sort records by date (newest first)
  const sortedRecords = [...data.records].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleEdit = (recordId: string) => {
    console.log("Edit record:", recordId);
    // TODO: Implement edit functionality
  };

  const handleDelete = (recordId: string) => {
    console.log("Delete record:", recordId);
    // TODO: Implement delete functionality
  };

  return (
    <div className="space-y-4">
      <Card className="gap-2 md:gap-5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Transaction History</CardTitle>
              <CardDescription className="text-sm mt-1">
                {sortedRecords.length} total records
              </CardDescription>
            </div>
            {sortedRecords.length > 0 && (
              <Badge variant="outline" className="text-xs">
                Latest: {format(new Date(sortedRecords[0].date), "MMM dd")}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {sortedRecords.length === 0 ? (
            <div className="p-8 text-center">
              <div className="p-3 bg-muted/50 rounded-full w-fit mx-auto mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-base font-medium mb-2">No records found</h3>
              <p className="text-sm text-muted-foreground">
                No financial records have been created yet.
              </p>
            </div>
          ) : (
            <>
              <div className="block md:hidden">
                <ScrollArea className="h-[600px]">
                  <div className="space-y-3 p-6">
                    {sortedRecords.map((record) => (
                      <Card
                        key={record.id}
                        className="p-4 border-l-4"
                        style={{
                          borderLeftColor:
                            record.amount >= 0 ? "#10b981" : "#ef4444",
                        }}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm leading-tight">
                                {record.text || "No description"}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant="secondary"
                                  className="text-xs px-2 py-0.5"
                                >
                                  {record.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {format(
                                    new Date(record.date),
                                    "MMM dd, yyyy"
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p
                                className={`font-semibold text-base ${
                                  record.amount >= 0
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                {record.amount >= 0 ? "+" : "-"}$
                                {Math.abs(record.amount).toLocaleString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(record.createdAt), "h:mm a")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pt-2 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 text-xs bg-transparent"
                              onClick={() => handleEdit(record.id)}
                            >
                              <EditIcon className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                              onClick={() => handleDelete(record.id)}
                            >
                              <Trash2Icon className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="hidden md:block">
                <ScrollArea className="h-[500px]">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                      <TableRow className="border-b">
                        <TableHead className="font-semibold pl-6">
                          Description
                        </TableHead>
                        <TableHead className="font-semibold">
                          Category
                        </TableHead>
                        <TableHead className="font-semibold text-right">
                          Amount
                        </TableHead>
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold">Time</TableHead>
                        <TableHead className="font-semibold text-center pr-6">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedRecords.map((record) => (
                        <TableRow
                          key={record.id}
                          className="hover:bg-muted/50 transition-colors"
                        >
                          <TableCell className="font-medium max-w-[200px] pl-6">
                            <div className="truncate" title={record.text}>
                              {record.text || "No description"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              {record.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            <span
                              className={`font-semibold ${
                                record.amount >= 0
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              {record.amount >= 0 ? "+" : "-"}$
                              {Math.abs(record.amount).toLocaleString()}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(record.date), "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {format(new Date(record.createdAt), "h:mm a")}
                          </TableCell>
                          <TableCell className="text-center pr-6">
                            <div className="flex items-center justify-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleEdit(record.id)}
                              >
                                <EditIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDelete(record.id)}
                              >
                                <Trash2Icon className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

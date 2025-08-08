"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, delay } from "@/lib/utils";

// Import from your schema
import { categories } from "@/db/schema";
import { createRecordSchema } from "../schema";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

type CreateRecordFormData = z.infer<typeof createRecordSchema>;

interface CreateRecordFormProps {
  userId: string;
}

export function CreateRecordForm({ userId }: CreateRecordFormProps) {
  const trpc = useTRPC();
  let loadingToastId: string | number | undefined;

  const createRecordMutation = useMutation(
    trpc.records.createRecord.mutationOptions({
      onMutate: () => {
        loadingToastId = toast.loading(
          "Uploading your expense to the database"
        );
      },
      onSuccess: () => {
        toast.dismiss(loadingToastId);
        toast.success("Record created successfully!", {
          description: `Added ${form.getValues().category} expense of ${form
            .getValues()
            .amount?.toFixed(2)}`,
        });

        // Reset form on success
        form.reset({
          text: "",
          amount: undefined,
          category: categories[categories.length - 1], // Default to "Other"
          date: new Date(),
          userId: userId,
        });
      },
      onError: (error) => {
        toast.dismiss(loadingToastId);
        console.error("Error creating record:", error);
        toast.error("Failed to create record", {
          description: error.message || "Please try again later",
        });
      },
    })
  );

  const form = useForm<CreateRecordFormData>({
    resolver: zodResolver(createRecordSchema),
    defaultValues: {
      text: "",
      amount: undefined,
      category: categories[categories.length - 1],
      date: new Date(),
      userId: userId,
    },
  });

  const onSubmit = async (data: CreateRecordFormData) => {
    console.log("Creating record:", data.date);
    createRecordMutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Add New Expense
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Track your spending by adding a new expense record
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Description Field */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Lunch at restaurant"
                    {...field}
                    disabled={createRecordMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amount Field */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(
                        value === "" ? undefined : parseFloat(value)
                      );
                    }}
                    value={field.value ?? ""}
                    disabled={createRecordMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Field */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={createRecordMutation.isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Field */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={createRecordMutation.isPending}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={createRecordMutation.isPending}
          >
            {createRecordMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Record"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

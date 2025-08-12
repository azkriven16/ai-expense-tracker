"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";

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
import { cn } from "@/lib/utils";

// Import from your schema
import { categories } from "@/db/schema";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { createRecordSchema } from "../schema";

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
          description: `Added ${form.getValues().category} expense of $${form
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
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-foreground">
          Add New Expense
        </h2>
        <p className="text-base text-muted-foreground mt-2">
          Track your spending by adding a new expense record
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Description Field - spans full width on all screens */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="md:col-span-2 lg:col-span-3">
                <FormLabel className="text-base font-medium">
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Lunch at restaurant"
                    {...field}
                    disabled={createRecordMutation.isPending}
                    className="h-12 text-base"
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
                <FormLabel className="text-base font-medium">
                  Amount ($)
                </FormLabel>
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
                        value === "" ? undefined : Number.parseFloat(value)
                      );
                    }}
                    value={field.value ?? ""}
                    disabled={createRecordMutation.isPending}
                    className="h-12 text-base"
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
                <FormLabel className="text-base font-medium">
                  Category
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={createRecordMutation.isPending}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 text-base">
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
                <FormLabel className="text-base font-medium">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 pl-3 text-left font-normal text-base",
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

          {/* Submit Button - spans full width */}
          <div className="md:col-span-2 lg:col-span-3 pt-4">
            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
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
          </div>
        </form>
      </Form>
    </div>
  );
}

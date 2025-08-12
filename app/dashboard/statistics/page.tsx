import { StatisticsView } from "@/modules/dashboard/views/statistics-view";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function StatisticsPage() {
  const { clerkId } = await caller.users.currentUser();
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.records.userWithRecords.queryOptions({ userId: clerkId })
  );

  return (
    <div className="min-h-screen flex flex-col gap-5 px-4 md:px-6 py-5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <StatisticsView userId={clerkId} />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}

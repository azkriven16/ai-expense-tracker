import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { CreateRecordView } from "@/modules/dashboard/views/create-record-view";

export default async function CreatePage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.users.currentUser.queryOptions());

  return (
    <div className="min-h-screen flex flex-col gap-5 px-4 md:px-6 py-5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <CreateRecordView />;
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}

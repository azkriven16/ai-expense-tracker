import { ClientGreeting } from "@/modules/dashboard/views/client-greeting";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function DashboardPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.currentUser.queryOptions());

  return (
    <div className="min-h-screen flex flex-col gap-5 px-4 md:px-">
      {/* <Announcement /> */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <ClientGreeting />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}

import Announcement from "@/modules/dashboard/ui/announcement";
import { ClientGreeting } from "@/modules/dashboard/views/client-greeting";
import { getQueryClient, trpc } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function DashboardPage() {
  const { userId } = await auth();

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.user.queryOptions({
      userId: userId!,
    })
  );

  return (
    <div className="min-h-screen">
      <Announcement />
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

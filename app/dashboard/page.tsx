import { ClientGreeting } from "@/modules/dashboard/views/client-greeting";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function DashboardPage() {
  prefetch(trpc.test.queryOptions());
  return (
    <div className="min-h-screen">
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <ClientGreeting />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </div>
  );
}

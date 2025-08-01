import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ClientGreeting } from "../client-greeting";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function Home() {
  prefetch(trpc.test.queryOptions());
  return (
    <div>
      <ThemeToggle />
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

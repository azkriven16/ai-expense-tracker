// import { ThemeToggle } from "@/components/theme-toggle";
// import { ClientGreeting } from "@/modules/dashboard/views/client-greeting";
// import { HydrateClient, prefetch, trpc } from "@/trpc/server";
// import { Suspense } from "react";
// import { ErrorBoundary } from "react-error-boundary";

// export default async function Dashboard() {
//   prefetch(trpc.test.queryOptions());
//   return (
//     <div>
//       <ThemeToggle />
//       <HydrateClient>
//         <ErrorBoundary fallback={<div>Something went wrong</div>}>
//           <Suspense fallback={<div>Loading...</div>}>
//             <ClientGreeting />
//           </Suspense>
//         </ErrorBoundary>
//       </HydrateClient>
//     </div>
//   );
// }

export default function Dashboard() {
  return <div>Dashboard</div>;
}

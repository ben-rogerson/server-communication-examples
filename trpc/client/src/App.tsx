import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { trpc } from "./utils/trpc";
import AllItems from "./components/AllItems";
import ViewItem from "./components/ViewItem";
import Layout from "./components/Layout";
import EditItem from "./components/EditItem";
import AddItem from "./components/AddItem";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AllItems />,
      },
      {
        path: "/add",
        element: <AddItem />,
      },
      {
        path: "/:id",
        element: <ViewItem />,
      },
      {
        path: "/edit/:id?", // Optional so we can catch a missing id
        element: <EditItem />,
      },
    ],
  },
]);

const TRPC_CLIENT = trpc.createClient({
  links: [httpBatchLink({ url: "http://localhost:2022" })],
});

const queryClientInitialState = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export function App() {
  const [queryClient] = useState(() => queryClientInitialState);
  const [trpcClient] = useState(() => TRPC_CLIENT);
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

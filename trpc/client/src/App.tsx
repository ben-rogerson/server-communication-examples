import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
        path: "/edit/:id",
        element: <EditItem />,
      },
    ],
  },
]);

const TRPC_CLIENT = trpc.createClient({
  links: [httpBatchLink({ url: "http://localhost:2022" })],
});

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => TRPC_CLIENT);
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

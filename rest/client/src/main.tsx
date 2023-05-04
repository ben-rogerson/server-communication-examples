import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AllItems from "@/components/AllItems";
import MainLayout from "@/components/Layout";
import AddItem from "@/components/AddItem";
import ViewItem from "@/components/ViewItem";
import EditItem from "@/components/EditItem";

import "@/styles/main.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
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

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

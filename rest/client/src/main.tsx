import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllItems from "@/components/AllItems";
import MainLayout from "@/components/Layout";
import AddItem from "@/components/AddItem";
import ViewItem from "@/components/ViewItem";
import EditItem from "@/components/EditItem";

import "@/styles/main.css";

const queryClient = new QueryClient();

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
        path: "/edit/:id",
        element: <EditItem />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

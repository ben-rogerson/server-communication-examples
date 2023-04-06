import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllItems from "@/components/AllItems";
import MainLayout from "@/components/Layout";
import AddItem from "@/components/AddItem";
import ViewItem from "@/components/ViewItem";
import EditItem from "@/components/EditItem";

import "@/styles/main.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
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
        path: "/edit/:id",
        element: <EditItem />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

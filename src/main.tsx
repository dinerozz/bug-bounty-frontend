import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import ReactDOM from "react-dom/client";

import "../main.css";
import { AppRoutes } from "./routes/AppRoutes";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60,
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AppRoutes />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);

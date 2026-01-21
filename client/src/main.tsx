import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from "./queryClient.ts";
import { AuthProvider } from "./providers/authprovider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={import.meta.env.VITE_BASE_PATH ?? '/'}>
    <StrictMode>
      
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
          <App />
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
);

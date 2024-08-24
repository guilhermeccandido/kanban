"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "../redux/store";
import TaskEditFormDialog from "./TaskEditFormDialog";

type ProvidersProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
        <TaskEditFormDialog />
      </Provider>
    </QueryClientProvider>
  );
}

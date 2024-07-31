"use client";

import { SessionProvider } from "next-auth/react";
import store from "../redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import TaskCreator from "./TaskCreator";
import TaskEditor from "./TaskEditor";

type ProvidersProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
        <TaskCreator />
        <TaskEditor />
      </Provider>
    </QueryClientProvider>
  );
}

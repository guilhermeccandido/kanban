"use client";

import AppLayout from "@/components/AppLayout";
import TodoColumnManager from "@/components/Home/TodoColumnManager";
import TodoWrapper from "@/components/TodoWrapper";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Home = () => {
  return (
    <AppLayout
      title="Board"
      action={
        <Button onClick={() => {}}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Task
        </Button>
      }
    >
      <div className="h-full flex flex-col">
        <div className="h-[90%] flex-auto">
          <TodoWrapper todos={[]}>
            <TodoColumnManager />
          </TodoWrapper>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;

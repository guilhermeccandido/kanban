"use client";

import { TASK_STATE_OPTIONS } from "@/lib/const";
import { TodoEditRequest } from "@/lib/validators/todo";
import { TodoType } from "@/model/Todo";
import axios, { AxiosError } from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useMutation } from "react-query";
import DndContextProvider, { OnDragEndEvent } from "../DnDContextProvider";
import { useToast } from "../ui/use-toast";

const TodoColumn = dynamic(() => import("./TodoColumn"), {
  ssr: false,
});

type TodoColumnManagerProp = {
  todos?: Record<TodoType["state"], TodoType[]>;
};

const TodoColumnManager: FC<TodoColumnManagerProp> = ({ todos }) => {
  const router = useRouter();
  const { axiosToast } = useToast();

  const { mutate: handleUpdateState } = useMutation({
    mutationFn: async ({ id, state, order }: TodoEditRequest) => {
      const result = await axios.patch("/api/todo/edit", { id, state, order });
      return result;
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
    onError: (error: AxiosError) => {
      axiosToast(error);
    },
  });

  const handleDragEnd = async (dragEndEvent: OnDragEndEvent) => {
    const { over, from, item, order } = dragEndEvent;
    if (!over || !from) return;

    const payload = {
      id: item,
      state: over,
      order,
    };

    const result = await handleUpdateState(payload);
  };

  return (
    <DndContextProvider onDragEnd={handleDragEnd}>
      <div className="h-[90%] flex gap-2 overflow-x-scroll">
        {TASK_STATE_OPTIONS.map(({ value, title }) => {
          return (
            <TodoColumn
              key={value}
              title={title}
              todos={todos[value] ?? []}
              state={value}
            />
          );
        })}
      </div>
    </DndContextProvider>
  );
};

export default TodoColumnManager;

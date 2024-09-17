"use client";

import { TASK_STATE_OPTIONS } from "@/lib/const";
import { TodoEditRequest } from "@/lib/validators/todo";
import { selectTodoByState } from "@/redux/selector/todoSelector";
import { Todo } from "@prisma/client";
import axios, { AxiosError } from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import DndContextProvider, { OnDragEndEvent } from "../DnDContextProvider";
import { useToast } from "../ui/use-toast";
import { useTypedDispatch } from "@/redux/store";
import todoEditRequest from "@/requests/todoEditRequest";
import { dndTodo, initiateTodos } from "@/redux/actions/todoAction";

const TodoColumn = dynamic(() => import("./TodoColumn"), {
  ssr: false,
});

const TodoColumnManager = () => {
  const todoByState = useSelector(selectTodoByState);
  const router = useRouter();
  const { axiosToast } = useToast();
  const dispatch = useTypedDispatch();

  const { mutate: handleUpdateState } = useMutation({
    mutationFn: async ({ id, state, order }: TodoEditRequest) => {
      const data = await todoEditRequest({ id, state, order });
      dispatch(initiateTodos(data));
      return data;
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error: AxiosError) => {
      axiosToast(error);
    },
  });

  const handleDragEnd = (dragEndEvent: OnDragEndEvent) => {
    const { over, from, item, order } = dragEndEvent;
    if (!over || !from || !item) return;

    const payload = {
      state: over as Todo["state"],
      id: item as string,
      order,
    };

    // handleUpdateState(payload);
    dispatch(dndTodo(payload));
  };

  return (
    <DndContextProvider onDragEnd={handleDragEnd}>
      <div className="h-[90%] flex gap-2 overflow-x-scroll">
        {TASK_STATE_OPTIONS.map(({ value, title }) => {
          return (
            <TodoColumn
              key={value}
              title={title}
              todos={todoByState[value] ?? []}
              state={value}
            />
          );
        })}
      </div>
    </DndContextProvider>
  );
};

export default TodoColumnManager;

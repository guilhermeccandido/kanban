"use client";

import { TASK_STATE_OPTIONS } from "@/lib/const";
import { TodoEditRequest } from "@/lib/validators/todo";
import todoEditRequest from "@/requests/todoEditRequest";
import { Todo } from "@prisma/client";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DndContextProvider, { OnDragEndEvent } from "../DnDContextProvider";
import { useToast } from "../ui/use-toast";
import TodoColumn from "./TodoColumn";
import todoFetchRequest from "@/requests/todoFetchRequest";

const TodoColumnManager = () => {
  const router = useRouter();
  const { axiosToast } = useToast();
  const queryClient = useQueryClient();

  const { data: todos } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: todoFetchRequest,
  });

  const { mutate: handleUpdateState } = useMutation({
    mutationFn: todoEditRequest,
    onMutate: async (payload: TodoEditRequest) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(
        ["todos"],
        previousTodos?.map((todo) => {
          if (todo.id === payload.id) {
            return {
              ...todo,
              state: payload.state!,
              order: payload.order!,
            };
          }
          return todo;
        }) ?? [],
      );

      return { previousTodos };
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

    handleUpdateState(payload);
  };

  return (
    <DndContextProvider onDragEnd={handleDragEnd}>
      <div className="flex gap-2 overflow-x-scroll p-6">
        {TASK_STATE_OPTIONS.map(({ value, title }) => {
          return (
            <TodoColumn
              key={value}
              title={title}
              todos={todos?.filter((todo) => todo.state === value) ?? []}
              state={value}
            />
          );
        })}
      </div>
    </DndContextProvider>
  );
};

export default TodoColumnManager;

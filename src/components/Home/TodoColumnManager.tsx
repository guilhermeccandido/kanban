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
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";
import SkeletonColumn from "./SkeletonColumn";

const TodoColumnManager = () => {
  const router = useRouter();
  const { axiosToast } = useToast();
  const queryClient = useQueryClient();

  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: todoFetchRequest,
  });

  const { mutate: handleUpdateState } = useMutation({
    mutationFn: todoEditRequest,
    onMutate: async (payload: TodoEditRequest) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      const originalTodo = previousTodos?.find(
        (todo) => todo.id === payload.id,
      );
      const originalState = originalTodo?.state!;
      const originalOrder = originalTodo?.order!;

      const newState = payload.state!;
      const updateTodoOrder = payload.order!;

      const newTodos =
        previousTodos?.map((todo) => {
          if (todo.id === payload.id) {
            return {
              ...todo,
              state: newState,
              order: updateTodoOrder,
            };
          }

          if (todo.state === originalState) {
            if (originalState === newState) {
              if (originalOrder < updateTodoOrder) {
                if (
                  todo.order > originalOrder &&
                  todo.order <= updateTodoOrder
                ) {
                  return { ...todo, order: todo.order - 1 };
                }
              } else if (originalOrder > updateTodoOrder) {
                if (
                  todo.order >= updateTodoOrder &&
                  todo.order < originalOrder
                ) {
                  return { ...todo, order: todo.order + 1 };
                }
              }
            } else {
              if (todo.order > originalOrder) {
                return { ...todo, order: todo.order - 1 };
              }
            }
          }

          if (todo.state === newState) {
            if (originalState !== newState) {
              if (todo.order >= updateTodoOrder) {
                return { ...todo, order: todo.order + 1 };
              }
            } else {
              return todo;
            }
          }

          return todo;
        }) ?? [];

      queryClient.setQueryData<Todo[]>(["todos"], newTodos);

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

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-scroll p-6">
        <SkeletonColumn state="TODO" />
        <SkeletonColumn state="IN_PROGRESS" />
        <SkeletonColumn state="REVIEW" />
        <SkeletonColumn state="DONE" />
      </div>
    );
  }

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

"use client";

import {
  TodoDeleteRequest,
  TodoEditRequest,
  TodoEditValidator,
} from "@/lib/validators/todo";
import todoEditRequest from "@/requests/todoEditRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import "react-quill/dist/quill.snow.css";
import TaskModificationForm from "./TaskModificationForm";
import { useToast } from "./ui/use-toast";
import { Todo } from "@prisma/client";

type TaskEditFormProps = {
  handleOnSuccess: () => void;
  handleOnClose: () => void;
  task: Todo;
};

const TaskEditFormController: FC<TaskEditFormProps> = ({
  handleOnSuccess,
  handleOnClose,
  task,
}) => {
  const { axiosToast } = useToast();
  const form = useForm<TodoEditRequest>({
    resolver: zodResolver(TodoEditValidator),
    defaultValues: {
      ...task,
    },
  });

  const editMutation = useMutation({
    mutationFn: async ({
      title,
      description,
      state,
      deadline,
      dangerPeriod,
      label,
    }: TodoEditRequest) => {
      return todoEditRequest({
        id: task.id,
        title,
        description,
        state,
        deadline,
        dangerPeriod,
        label,
      });
    },
    onError: (error: AxiosError) => {
      axiosToast(error);
    },
    onSuccess: () => {
      handleOnSuccess();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id }: TodoDeleteRequest) => {
      const result = await axios.delete("/api/todo/delete", {
        data: {
          id,
        },
      });
      return result.data;
    },
    onError: (error: AxiosError) => {
      axiosToast(error);
    },
    onSuccess: () => {
      handleOnSuccess();
    },
  });

  return (
    <TaskModificationForm
      handleOnClose={handleOnClose}
      task={task}
      title="Edit Task"
      enableDelete
      deleteMutationFunctionReturn={deleteMutation}
      editMutationFunctionReturn={editMutation}
      formFunctionReturn={form}
    />
  );
};

export default TaskEditFormController;

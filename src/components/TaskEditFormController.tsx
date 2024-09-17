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
import { useTypedDispatch } from "@/redux/store";
import { initiateTodos } from "@/redux/actions/todoAction";

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
  const dispatch = useTypedDispatch();
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
      label,
    }: TodoEditRequest) => {
      const data = await todoEditRequest({
        id: task.id,
        title,
        description,
        state,
        deadline,
        label,
      });

      dispatch(initiateTodos(data));
      return data;
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
      const { data }: { data: Todo[] } = await axios.delete(
        "/api/todo/delete",
        {
          data: {
            id,
          },
        },
      );

      dispatch(initiateTodos(data));
      return data;
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

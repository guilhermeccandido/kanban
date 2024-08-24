"use client";

import { TodoCreateRequest, TodoCreateValidator } from "@/lib/validators/todo";
import { TaskCreatorDefaultValues } from "@/redux/actions/todoAction";
import todoCreateRequest from "@/requests/todoCreateRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import "react-quill/dist/quill.snow.css";
import TaskModificationForm from "./TaskModificationForm";
import { useToast } from "./ui/use-toast";
import { TASK_STATE_OPTIONS } from "@/lib/const";

type TaskCreateFormProps = {
  handleOnSuccess: () => void;
  handleOnClose: () => void;
  task: TaskCreatorDefaultValues;
};

const TaskCreateFormController: FC<TaskCreateFormProps> = ({
  handleOnSuccess,
  handleOnClose,
  task,
}) => {
  const { axiosToast } = useToast();
  const form = useForm<TodoCreateRequest>({
    resolver: zodResolver(TodoCreateValidator),
    defaultValues: {
      state: TASK_STATE_OPTIONS[0].value,
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
    }: TodoCreateRequest) => {
      const result = todoCreateRequest({
        title,
        description,
        state,
        deadline,
        dangerPeriod,
        label,
      });
      return result;
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
      title="Create Task"
      editMutationFunctionReturn={editMutation}
      formFunctionReturn={form}
    />
  );
};

export default TaskCreateFormController;

"use client";

import { TASK_STATE_OPTIONS } from "@/lib/const";
import { TodoCreateRequest, TodoCreateValidator } from "@/lib/validators/todo";
import { TaskCreatorDefaultValues } from "@/redux/actions/todoEditorAction";
import todoCreateRequest from "@/requests/todoCreateRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import "react-quill/dist/quill.snow.css";
import TaskModificationForm from "./TaskModificationForm";
import { useToast } from "./ui/use-toast";
import { useTypedDispatch } from "@/redux/store";
import { addTodo } from "@/redux/actions/todoAction";

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
  const dispatch = useTypedDispatch();
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
      label,
    }: TodoCreateRequest) => {
      const data = await todoCreateRequest({
        title,
        description,
        state,
        deadline,
        label,
      });
      dispatch(addTodo(data));
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
      title="Create Task"
      editMutationFunctionReturn={editMutation}
      formFunctionReturn={form}
    />
  );
};

export default TaskCreateFormController;

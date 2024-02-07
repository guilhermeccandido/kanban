"use client";

import { FC } from "react";
import CustomizedDialog from "../CustomizedDialog";
import TaskEditorForm from "./TaskEditorForm";
import { TodoType } from "@/model/Todo";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { closeTodoEditor } from "@/redux/actions/todoAction";

const TaskEditor: FC = () => {
  const isOpen = useSelector<ReduxState, boolean>(
    (state) => state.todo.isTodoEditorOpen,
  );
  const task = useSelector<ReduxState, TodoType | null>(
    (state) => state.todo.targetTodo,
  );
  const taskEditorCaller = useSelector<ReduxState, string>((state) => state.todo.taskEditorCaller);
  const dispatch = useDispatch();
  const router = useRouter();

  const onClose = () => {
    dispatch(closeTodoEditor());
  };

  const handleOnSuccess = () => {
    onClose();
    router.push(taskEditorCaller);
    router.refresh();
  };

  if (!task) return null;

  return (
    <CustomizedDialog open={isOpen} onClose={onClose}>
      <TaskEditorForm handleOnSuccess={handleOnSuccess} task={task} />
    </CustomizedDialog>
  );
};

export default TaskEditor;

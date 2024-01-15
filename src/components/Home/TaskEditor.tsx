"use client";

import { FC } from "react";
import CustomizedDialog from "../CustomizedDialog";
import TaskEditorForm from "./TaskEditorForm";
import { TodoType } from "@/model/Todo";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "@/redux/store";
import { closeTodoEditor } from "@/redux/actions/todoEditorAction";
import { useRouter } from "next/navigation";

const TaskEditor: FC = () => {
  const isOpen = useSelector<ReduxState, boolean>(
    (state) => state.todoEditor.isTodoEditorOpen,
  );
  const task = useSelector<ReduxState, TodoType | null>(
    (state) => state.todoEditor.targetTodo,
  );
  const caller = useSelector<ReduxState, string>(
    (state) => state.todoEditor.caller,
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const onClose = () => {
    dispatch(closeTodoEditor());
  };

  const handleOnSuccess = () => {
    onClose();
    router.push(caller);
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

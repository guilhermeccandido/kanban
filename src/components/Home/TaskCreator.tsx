"use client";

import CustomizedDialog from "../CustomizedDialog";
import TaskCreatorForm from "./TaskCreatorForm";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "@/redux/store";
import { CloseTodoCreator } from "@/redux/actions/todoAction";
import { useRouter } from "next/navigation";

const TaskCreator = () => {
  const open = useSelector<ReduxState, boolean>(
    (store) => store.todo.isTodoCreatorOpen,
  );
  const taskCreatorCaller = useSelector<ReduxState, string>(
    (store) => store.todo.taskCreatorCaller,
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOnClose = () => {
    dispatch(CloseTodoCreator());
  };

  const handleOnSuccess = () => {
    handleOnClose();
    router.push(taskCreatorCaller);
    router.refresh();
  };

  return (
    <CustomizedDialog open={open} onClose={handleOnClose}>
      <TaskCreatorForm handleOnSuccess={handleOnSuccess} />
    </CustomizedDialog>
  );
};

export default TaskCreator;

import {
  TaskCreatorDefaultValues,
  closeTodoEditor,
} from "@/redux/actions/todoAction";
import { ReduxState } from "@/redux/store";
import { OptionalTodo } from "@/types/todo";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomizedDialog from "./CustomizedDialog";
import TaskCreateFormController from "./TaskCreateFormController";
import TaskEditFormController from "./TaskEditFormController";

const TaskEditFormDialog: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isOpen = useSelector<ReduxState, boolean>(
    (state) => state.todo.isTodoEditorOpen,
  );

  const task = useSelector<ReduxState, OptionalTodo | TaskCreatorDefaultValues>(
    (state) => state.todo.targetTodo,
  );

  const caller = useSelector<ReduxState, string>(
    (state) => state.todo.taskEditorCaller,
  );

  const type = useSelector<ReduxState, "create" | "edit">(
    (state) => state.todo.taskEditType!,
  );

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
      {type === "edit" ? (
        <TaskEditFormController
          handleOnSuccess={handleOnSuccess}
          handleOnClose={onClose}
          task={task as OptionalTodo}
          key={"edit"}
        />
      ) : (
        <TaskCreateFormController
          handleOnSuccess={handleOnSuccess}
          handleOnClose={onClose}
          task={task}
          key={"create"}
        />
      )}
    </CustomizedDialog>
  );
};

export default TaskEditFormDialog;

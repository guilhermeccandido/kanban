import { TodoType } from "@/model/Todo";
import { FC } from "react";
import CheckBox from "../CustomizedCheckBox";
import { useRouter } from "next/navigation";
import axios from "axios";
import { TodoCheckRequest } from "@/lib/validators/todo";
import dayjs from "dayjs";
import { cn, getEarilerDate } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "@/redux/store";
import { openTodoEditor } from "@/redux/actions/todoAction";

type TaskProps = {
  todo: TodoType;
  checked?: boolean;
};

const Task: FC<TaskProps> = ({ todo, checked = false }) => {
  const router = useRouter();
  const sortedBy = useSelector<ReduxState, string>(
    (state) => state.todo.sortedBy,
  );
  const dispatch = useDispatch();

  const handleOnCheckBoxChange = async (value: boolean) => {
    const payload: TodoCheckRequest = { id: todo._id, checked: value };
    const response = await axios.patch("/api/todo/check", payload);
    return response;
  };

  const handleOnSuccess = () => {
    router.push("/");
    router.refresh();
  };

  const earlierDueDate = getEarilerDate(todo.dueDate, todo.plannedFinishDate);
  const displayDate =
    sortedBy === "dueDate"
      ? todo.dueDate
      : sortedBy === "plannedFinishDate"
        ? todo.plannedFinishDate
        : earlierDueDate;

  const handleOpenTaskEditor = () => {
    dispatch(openTodoEditor(todo, "/"));
  };

  return (
    <div
      className="flex items-center bg-white px-4 py-3 rounded-md cursor-pointer hover:bg-zinc-100 shadow-md justify-between"
      onClick={() => handleOpenTaskEditor()}
    >
      <div className="flex">
        <CheckBox
          onChange={handleOnCheckBoxChange}
          onSuccess={handleOnSuccess}
          async={true}
          classname="z-10"
          defaultChecked={checked}
        />
        <div className={cn("mx-3", checked && "line-through text-zinc-400")}>
          {todo.title}
        </div>
      </div>
      <div className="text-zinc-400">
        {displayDate !== undefined ? dayjs(displayDate).format("DD/MM") : ""}
      </div>
    </div>
  );
};

export default Task;

import { cn } from "@/lib/utils";
import { openTodoEditor } from "@/redux/actions/todoEditorAction";
import { Todo } from "@prisma/client";
import { FC, HTMLProps, MouseEvent, useCallback } from "react";
import { useDispatch } from "react-redux";

type TodoCellProps = {
  todos?: Todo[];
  className?: HTMLProps<HTMLDivElement>["className"];
  ddlType: "deadline" | "plannedDeadline" | "finished";
};

const TodoCell: FC<TodoCellProps> = ({ todos, className, ddlType }) => {
  const dispatch = useDispatch();

  const handleOpenTodoEditor = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    todo: Todo,
  ) => {
    e.stopPropagation();
    dispatch(openTodoEditor(todo, "/calendar", "edit"));
  };

  const dotColor = useCallback(
    (type: "deadline" | "plannedDeadline" | "finished") => {
      switch (type) {
        case "deadline":
          return "bg-[#EF2D56]";
        case "plannedDeadline":
          return "bg-[#FEC601]";
        case "finished":
          return "bg-[#0CCE6B]";
        default:
          return "";
      }
    },
    [],
  );

  return (
    <>
      {todos?.map((todo) => (
        <div
          className={cn(
            "w-full h-{20px} rounded-md border cursor-pointer z-10 pl-1",
            className,
          )}
          key={todo.id.toString()}
          onClick={(e) => handleOpenTodoEditor(e, todo)}
        >
          <span className="flex text-center items-center">
            <span className={cn("w-2 h-2 rounded-full", dotColor(ddlType))} />
            <span
              className={cn(
                "px-1 overflow-hidden whitespace-nowrap text-ellipsis",
              )}
            >
              {todo.title}
            </span>
          </span>
        </div>
      ))}
    </>
  );
};

export default TodoCell;

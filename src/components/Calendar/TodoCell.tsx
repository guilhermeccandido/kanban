import { cn } from "@/lib/utils";
import { TodoType } from "@/model/Todo";
import { openTodoEditor } from "@/redux/actions/todoAction";
import { FC, HTMLProps, MouseEvent } from "react";
import { useDispatch } from "react-redux";

type TodoCellProps = {
  todos?: TodoType[];
  className?: HTMLProps<HTMLDivElement>["className"];
};

const TodoCell: FC<TodoCellProps> = ({ todos, className }) => {
  const dispatch = useDispatch();

  const handleOpenTodoEditor = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    todo: TodoType,
  ) => {
    e.stopPropagation();
    dispatch(openTodoEditor(todo, "/calendar"));
  };

  return (
    <>
      {todos?.map((todo) => (
        <div
          className={cn(
            "w-full h-{20px} rounded-md border cursor-pointer z-10",
            className,
          )}
          key={todo._id.toString()}
          onClick={(e) => handleOpenTodoEditor(e, todo)}
        >
          <span className="flex text-center">
            <span
              className={cn(
                "px-2 overflow-hidden whitespace-nowrap text-ellipsis",
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

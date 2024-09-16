import dayjs from "dayjs";
import { FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import { TodoOfDay } from "./TodoCalendar";
import TodoCell from "./TodoCell";
import { openTodoEditor } from "@/redux/actions/todoEditorAction";
import { cn } from "@/lib/utils";

type DayCellProps = {
  dayCode: string;
  todos?: TodoOfDay;
  numberOfTaskdisplaying?: number;
  today: boolean;
};

const DayCell: FC<DayCellProps> = ({
  dayCode,
  todos,
  numberOfTaskdisplaying = 3,
  today,
}) => {
  const dispatch = useDispatch();
  const { day, unixTime } = useMemo(() => {
    const dayjsObj = dayjs(dayCode);
    return {
      day: dayjsObj.date(),
      unixTime: dayjsObj.unix() * 1000,
    };
  }, [dayCode]);
  const includedTodos = useMemo(() => {
    if (typeof todos === "undefined") return null;
    let numberOfIncludedTodos = 0;
    const includedTodos: { todos: TodoOfDay; numberOfHiddenTodo: number } = {
      todos: {
        deadline: [],
        finished: [],
      },
      numberOfHiddenTodo: 0,
    };
    if (todos.deadline.length > numberOfTaskdisplaying) {
      includedTodos.todos.deadline = todos.deadline.slice(
        0,
        numberOfTaskdisplaying,
      );
      numberOfIncludedTodos = numberOfTaskdisplaying;
    } else {
      includedTodos.todos.deadline = todos.deadline;
      numberOfIncludedTodos += todos.deadline.length;
    }

    if (
      todos.finished.length + numberOfIncludedTodos >
      numberOfTaskdisplaying
    ) {
      includedTodos.todos.finished = todos.finished.slice(
        0,
        numberOfTaskdisplaying - numberOfIncludedTodos,
      );
      numberOfIncludedTodos = numberOfTaskdisplaying;
    } else {
      includedTodos.todos.finished = todos.finished;
      numberOfIncludedTodos += todos.finished.length;
    }

    includedTodos.numberOfHiddenTodo =
      Object.values(todos).reduce((acc, value) => {
        return acc + value.length;
      }, 0) - numberOfTaskdisplaying;

    return includedTodos;
  }, [todos, numberOfTaskdisplaying]);

  const handleOpenTaskCreator = () => {
    dispatch(openTodoEditor({ deadline: unixTime }, "/calendar", "create"));
  };

  return (
    <div
      className="flex-1 flex flex-col items-center border-r border-b border-zinc-300 overflow-hidden"
      onClick={handleOpenTaskCreator}
    >
      <div className="w-5 h-5">
        <div
          className={cn("w-full h-full rounded-full flex justify-center items-center text-sm", today && "bg-green-200")}
        >
          {day}
        </div>
      </div>
      <TodoCell todos={includedTodos?.todos.deadline} ddlType="deadline" />
      <TodoCell todos={includedTodos?.todos.finished} ddlType="finished" />
      {includedTodos && includedTodos?.numberOfHiddenTodo > 0 && (
        <div className="px-2 w-full text-sm overflow-hidden whitespace-nowrap text-ellipsis text-center">
          {includedTodos?.numberOfHiddenTodo} todo hidden
        </div>
      )}
    </div>
  );
};

export default DayCell;

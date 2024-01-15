import { cn } from "@/lib/utils";
import { TodoType } from "@/model/Todo";
import { FC } from "react";
import { TodoOfDay } from "./TodoCalendar";
import TodoCell from "./TodoCell";

type DayCellProps = {
  day: number;
  todos?: TodoOfDay;
  numberOfTaskdisplaying?: number;
};

const DayCell: FC<DayCellProps> = ({
  day,
  todos,
  numberOfTaskdisplaying = 3,
}) => {
  const getTodoCells = (todos: TodoOfDay) => {
    if (typeof todos === "undefined") return null;
    let numberOfIncludedTodos = 0;
    const includedTodos: TodoOfDay = {
      deadline: [],
      plannedDeadline: [],
      finished: [],
    };
    if (todos.deadline.length > numberOfTaskdisplaying) {
      includedTodos.deadline = todos.deadline.slice(0, numberOfTaskdisplaying);
      numberOfIncludedTodos = numberOfTaskdisplaying;
    } else {
      includedTodos.deadline = todos.deadline;
      numberOfIncludedTodos += todos.deadline.length;
    }

    if (
      todos.plannedDeadline.length + numberOfIncludedTodos >
      numberOfTaskdisplaying
    ) {
      includedTodos.plannedDeadline = todos.plannedDeadline.slice(
        0,
        numberOfTaskdisplaying - numberOfIncludedTodos,
      );
      numberOfIncludedTodos = numberOfTaskdisplaying;
    } else {
      includedTodos.plannedDeadline = todos.plannedDeadline;
      numberOfIncludedTodos += todos.plannedDeadline.length;
    }

    if (
      todos.finished.length + numberOfIncludedTodos >
      numberOfTaskdisplaying
    ) {
      includedTodos.finished = todos.finished.slice(
        0,
        numberOfTaskdisplaying - numberOfIncludedTodos,
      );
      numberOfIncludedTodos = numberOfTaskdisplaying;
    } else {
      includedTodos.finished = todos.finished;
      numberOfIncludedTodos += todos.finished.length;
    }

    console.log(includedTodos, todos, day);
  };

  getTodoCells(todos);

  return (
    <div className="flex-1 flex flex-col items-center border-r border-b border-zinc-300 overflow-hidden">
      <div className="w-5 h-5 cursor-pointer">
        <div
          className={`w-full h-full rounded-full flex justify-center items-center text-sm`}
        >
          {day}
        </div>
      </div>
      <TodoCell todos={todos?.deadline} className="bg-red-400" />
      <TodoCell todos={todos?.plannedDeadline} className="bg-orange-400" />
      <TodoCell todos={todos?.finished} className="bg-zinc-300" />
    </div>
  );
};

export default DayCell;

"use client";

import { FC, useMemo } from "react";
import Task from "./Task";
import { TodoType } from "@/model/Todo";
import TaskEditor from "./TaskEditor";
import { useSelector } from "react-redux";
import { ReduxState } from "@/redux/store";
import TaskOrderManager from "./TaskOrderManager";
import FinishedTasksManager from "./FinishedTasks";

type TasksProps = {
  unFinishedTodos: TodoType[];
  finishedTodos: TodoType[];
};

const Tasks: FC<TasksProps> = ({ unFinishedTodos, finishedTodos }) => {
  const sortedBy = useSelector<ReduxState, string>(
    (state) => state.todo.sortedBy,
  );

  const sortAsc = useSelector<ReduxState, boolean>(
    (state) => state.todo.sortedAsc,
  );

  const sortedTodos = useMemo(() => {
    let sortedTodos = [...unFinishedTodos];
    switch (sortedBy) {
      case "priority":
        sortedTodos.sort((a, b) => {
          if (a?.dueDate === undefined) return 1;
          if (b?.dueDate === undefined) return -1;
          // consider both duedate and planned finish date to sort by priority
          const aEarilerDueDate =
            a.plannedFinishDate !== undefined
              ? a.dueDate < a.plannedFinishDate
                ? a.dueDate
                : a.plannedFinishDate
              : a.dueDate;
          const bEarilerDueDate =
            b.plannedFinishDate !== undefined
              ? b.dueDate < b.plannedFinishDate
                ? b.dueDate
                : b.plannedFinishDate
              : b.dueDate;
          if (sortAsc) {
            return aEarilerDueDate < bEarilerDueDate ? -1 : 1;
          } else {
            return aEarilerDueDate > bEarilerDueDate ? -1 : 1;
          }
        });
        break;
      case "dueDate":
        sortedTodos.sort((a, b) => {
          if (a?.dueDate === undefined) return 1;
          if (b?.dueDate === undefined) return -1;
          if (a.dueDate === b.dueDate) return 0;
          if (sortAsc) {
            return a.dueDate < b.dueDate ? -1 : 1;
          } else {
            return a.dueDate > b.dueDate ? -1 : 1;
          }
        });
        break;
      case "plannedFinishDate":
        sortedTodos.sort((a, b) => {
          if (a?.plannedFinishDate === undefined) return 1;
          if (b?.plannedFinishDate === undefined) return -1;
          if (a.plannedFinishDate === b.plannedFinishDate) return 0;
          if (sortAsc) {
            return a.plannedFinishDate < b.plannedFinishDate ? -1 : 1;
          } else {
            return a.plannedFinishDate > b.plannedFinishDate ? -1 : 1;
          }
        });
        break;
      default:
        break;
    }
    return sortedTodos;
  }, [unFinishedTodos, sortedBy, sortAsc]);

  return (
    <>
      {(unFinishedTodos.length > 0 || finishedTodos.length > 0) && (
        <TaskOrderManager />
      )}
      <div className="max-h-[calc(100%-12rem)] flex flex-col gap-2 overflow-scroll">
        {sortedTodos.map((todo) => (
          <Task todo={todo} key={todo._id.toString()} />
        ))}
        {finishedTodos.length > 0 && (
          <FinishedTasksManager tasks={finishedTodos} />
        )}
        <TaskEditor />
      </div>
    </>
  );
};

export default Tasks;

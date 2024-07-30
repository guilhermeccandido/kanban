"use client";

import useDraggable from "@/hooks/useDraggable";
import { throttle } from "@/lib/helper";
import { getEarilerDate } from "@/lib/utils";
import { TodoType } from "@/model/Todo";
import { openTodoEditor } from "@/redux/actions/todoAction";
import clsx from "clsx";
import dayjs from "dayjs";
import { FC, useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

type TodoProps = {
  todo: TodoType;
};

const TodoCard: FC<TodoProps> = ({ todo }) => {
  const dispatch = useDispatch();

  const isDescriptionHvLineBreak = useMemo(
    () => todo.description?.includes("\n"),
    [todo.description],
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      dispatch(openTodoEditor(todo, "/"));
    },
    [dispatch, todo],
  );

  const { setNodeRef, attributes } = useDraggable({
    id: todo._id.toString(),
    handleClick,
  });

  return (
    <div
      className="border-zinc-100 hover:shadow-md border rounded mb-1 mx-auto flex flex-col cursor-pointer bg-white"
      ref={setNodeRef}
      {...attributes}
    >
      <div className="px-2 py-1 ">
        <div className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">
          {todo.title}
        </div>
        <div
          className={clsx(
            "text-sm whitespace-pre-line overflow-hidden text-ellipsis",
            isDescriptionHvLineBreak && "line-clamp-3",
          )}
        >
          {todo?.description}
        </div>
        <div className="text-xs text-right">
          {(todo.dueDate || todo.plannedFinishDate) &&
            dayjs(getEarilerDate(todo.dueDate, todo.plannedFinishDate)).format(
              "YYYY-MM-DD",
            )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;

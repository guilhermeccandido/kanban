"use client";

import useDraggable from "@/hooks/useDraggable";
import { openTodoEditor } from "@/redux/actions/todoAction";
import { OptionalTodo } from "@/types/todo";
import dayjs from "dayjs";
import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";

type TodoProps = {
  todo: OptionalTodo;
};

const TodoCard: FC<TodoProps> = ({ todo }) => {
  const dispatch = useDispatch();

  const handleClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      dispatch(openTodoEditor(todo, "/", "edit"));
    },
    [dispatch, todo],
  );

  const { setNodeRef, attributes } = useDraggable({
    id: todo.id,
    handleClick,
  });

  return (
    <div
      className="border-zinc-100 hover:shadow-md border rounded mb-1 mx-auto flex flex-col cursor-pointer bg-white"
      ref={setNodeRef}
      {...attributes}
    >
      <div className="px-2 py-1 ">
        <div className="pb-2 font-bold overflow-hidden whitespace-nowrap text-ellipsis">
          {todo.title}
        </div>
        {todo.label && (
          <div className="flex gap-2 flex-wrap">
            {todo.label.map((label) => (
              <div key={label} className="px-2 rounded-sm bg-gray-200 leading-5">
                {label}
              </div>
            ))}
          </div>
        )}
        <div className="text-xs text-right">
          {todo.deadline && dayjs(todo.deadline).format("YYYY-MM-DD")}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;

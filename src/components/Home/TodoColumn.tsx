"use client";

import { TodoType } from "@/model/Todo";
import { FC } from "react";
import HomeTaskCreator from "./HomeTaskCreator";
import dynamic from "next/dynamic";
import useDroppable from "@/hooks/useDroppable";

const TodoCard = dynamic(() => import("@/components/Home/TodoCard"), {
  ssr: false,
});

type TodoColumnProp = {
  title: string;
  todos: TodoType[];
  state: TodoType["state"];
};

const TodoColumn: FC<TodoColumnProp> = ({ title, todos, state }) => {
  const { setNodeRef } = useDroppable({ id: state });

  return (
    <div className="bg-white h-full py-2 rounded-md flex flex-col shadow-lg max-w-[288px] min-w-[288px]">
      <div className="text-center border-b border-zinc-100 py-1">{title}</div>
      <div
        className="flex-col flex-grow relative px-2 pt-1 overflow-auto"
        ref={setNodeRef}
      >
        {todos
          ?.sort((a, b) => a.order - b.order)
          .map((todo) => {
            return <TodoCard todo={todo} key={todo._id.toString()} />;
          })}
      </div>
      <HomeTaskCreator state={state} />
    </div>
  );
};

export default TodoColumn;

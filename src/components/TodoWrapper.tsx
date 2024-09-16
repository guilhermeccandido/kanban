"use client";

import { initiateTodos } from "@/redux/actions/todoAction";
import { useTypedDispatch } from "@/redux/store";
import { Todo } from "@prisma/client";
import { FC } from "react";

type TodoWrapperProps = {
  children: React.ReactNode;
  todos: Todo[];
};

const TodoWrapper: FC<TodoWrapperProps> = ({ children, todos }) => {
  const dispatch = useTypedDispatch();
  dispatch(initiateTodos(todos));

  return <>{children}</>;
};

export default TodoWrapper;

import { Todo } from "@prisma/client";
import { createSelector } from "reselect";
import { ReduxState } from "../store";

export const selectTodos = (state: ReduxState) => state.todo.todos;

export const selectTodoByState = createSelector(
  [selectTodos],
  (todos) =>
    todos.reduce(
      (acc, todo) => {
        if (todo.state in acc) {
          acc[todo.state].push(todo);
        } else {
          acc[todo.state] = [todo];
        }
        return acc;
      },
      {} as Record<Todo["state"], Todo[]>,
    ),
);

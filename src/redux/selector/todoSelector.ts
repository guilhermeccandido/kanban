import { Todo } from "@prisma/client";
import { createSelector } from "reselect";
import { ReduxState } from "../store";

const selectTodos = (state: ReduxState) => state.todo.todos;

export const selectNotDeletedTodos = createSelector([selectTodos], (todos) =>
  todos.filter((todo) => !todo.isDeleted),
);

export const selectTodoByState = createSelector(
  [selectNotDeletedTodos],
  (todos) =>
    todos.reduce(
      (acc, todo) => {
        if (todo.state in acc) {
          acc[todo.state].push(todo);
        } else {
          acc[todo.state] = [todo];
        }
        console.log(acc);
        return acc;
      },
      {} as Record<Todo["state"], Todo[]>,
    ),
);

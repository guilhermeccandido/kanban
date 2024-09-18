import todoEditRequest from "@/requests/todoEditRequest";
import { Todo } from "@prisma/client";
import { Dispatch } from "redux";
import { ReduxState } from "../store";

export enum todoActionTypes {
  INITIATE_TODOS = "INITIATE_TODOS",
  ADD_TODO = "ADD_TODO",
  UPDATE_TODO = "UPDATE_TODO",
}

export interface InitialTodoStateI {
  type: typeof todoActionTypes.INITIATE_TODOS;
  payload: Todo[];
}

export interface AddTodoI {
  type: typeof todoActionTypes.ADD_TODO;
  payload: Todo;
}

export interface UpdateTodoI {
  type: typeof todoActionTypes.UPDATE_TODO;
  payload: Todo;
}

export interface DnDTodoI {
  type: typeof todoActionTypes.INITIATE_TODOS;
  payload: Todo[];
}

export const dndTodo = ({
  id,
  state,
  order,
}: Pick<Todo, "id" | "state" | "order">) => {
  return async (dispatch: Dispatch, getState: () => ReduxState) => {
    const { todos } = getState().todo;

    if (!todos || todos.length === 0) return;

    const record = todos.find((todo) => todo.id === id);
    if (!record) return;

    const changedState = record.state !== state;
    const isOrderIncreased = record.order < order;

    if (changedState) {
      const newTodos = todos
        .map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              order,
              state,
            };
          }

          if (todo.state === record.state && todo.order > record.order) {
            return {
              ...todo,
              order: todo.order - 1,
            };
          }

          if (todo.state === state && todo.order >= order) {
            return {
              ...todo,
              order: todo.order + 1,
            };
          }

          return todo;
        })
        .sort((a, b) => a.order - b.order);

      dispatch(initiateTodos(newTodos));
    } else if (isOrderIncreased) {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            order,
            state,
          };
        }

        if (
          todo.state === state &&
          todo.order > record.order &&
          todo.order <= order
        ) {
          return {
            ...todo,
            order: todo.order - 1,
          };
        }

        return todo;
      });

      dispatch(initiateTodos(newTodos));
    } else {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            order,
            state,
          };
        }

        if (
          todo.state === state &&
          todo.order < record.order &&
          todo.order >= order
        ) {
          return {
            ...todo,
            order: todo.order + 1,
          };
        }

        return todo;
      });

      dispatch(initiateTodos(newTodos));
    }

    try {
      await todoEditRequest({ id, state, order });
    } catch (error) {
      dispatch(initiateTodos(todos));
      throw error;
    }
  };
};

export const initiateTodos = (todos: Todo[]): InitialTodoStateI => ({
  type: todoActionTypes.INITIATE_TODOS,
  payload: todos,
});

export const addTodo = (todo: Todo): AddTodoI => ({
  type: todoActionTypes.ADD_TODO,
  payload: todo,
});

export const updateTodo = (todo: Todo): UpdateTodoI => ({
  type: todoActionTypes.UPDATE_TODO,
  payload: todo,
});

export type TodoAction = InitialTodoStateI | AddTodoI | UpdateTodoI;

import { Todo } from "@prisma/client";

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

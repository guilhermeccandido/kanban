import { OptionalTodo } from "@/types/todo";

export enum todoActionType {
  OPEN_TODO_EDITOR = "OPEN_TODO_EDITOR",
  CLOSE_TODO_EDITOR = "CLOSE_TODO_EDITOR",
}

export interface CloseTodoEditorI {
  type: todoActionType.CLOSE_TODO_EDITOR;
  payload: null;
}

export type TaskEditType = "create" | "edit";

export interface OpenTodoEditorI<T extends TaskEditType> {
  type: todoActionType.OPEN_TODO_EDITOR;
  payload: {
    todo: T extends "edit" ? OptionalTodo : TaskCreatorDefaultValues;
    taskEditorCaller: string;
    type: T;
  };
}

export type TaskCreatorDefaultValues = Partial<
  Pick<OptionalTodo, "deadline" | "state">
>;

export const closeTodoEditor = (): CloseTodoEditorI => {
  return {
    type: todoActionType.CLOSE_TODO_EDITOR,
    payload: null,
  };
};

export const openTodoEditor = <T extends TaskEditType>(
  todo: T extends "edit" ? OptionalTodo : TaskCreatorDefaultValues,
  taskEditorCaller: string,
  type: T,
): OpenTodoEditorI<T> => {
  return {
    type: todoActionType.OPEN_TODO_EDITOR,
    payload: {
      todo,
      taskEditorCaller,
      type,
    },
  };
};

export type TodoAction =
  | CloseTodoEditorI
  | OpenTodoEditorI<"create">
  | OpenTodoEditorI<"edit">;

import { TodoType } from "@/model/Todo";

export enum todoEditorActionType {
  OPEN_TODO_EDITOR = "OPEN_TODO_EDITOR",
  CLOSE_TODO_EDITOR = "CLOSE_TODO_EDITOR",
}

export interface CloseTodoEditorI {
  type: todoEditorActionType.CLOSE_TODO_EDITOR;
}

export interface OpenTodoEditorI {
  type: todoEditorActionType.OPEN_TODO_EDITOR;
  payload: {
    todo: TodoType;
    caller: string;
  };
}

export const closeTodoEditor = (): CloseTodoEditorI => {
  return {
    type: todoEditorActionType.CLOSE_TODO_EDITOR,
  };
};

export const openTodoEditor = (
  todo: TodoType,
  caller: string,
): OpenTodoEditorI => {
  return {
    type: todoEditorActionType.OPEN_TODO_EDITOR,
    payload: {
      todo,
      caller,
    },
  };
};

export type TodoEditorAction = CloseTodoEditorI | OpenTodoEditorI;

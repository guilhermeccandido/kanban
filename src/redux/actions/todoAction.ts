import { TodoType } from "@/model/Todo";
import { TodoState } from "../reducers/todoReducer";

export enum todoActionType {
  SORT_TODO_BY = "SORT_TODO_BY",
  SORT_TODO_ASC = "SORT_TODO_ASC",
  OPEN_TODO_EDITOR = "OPEN_TODO_EDITOR",
  CLOSE_TODO_EDITOR = "CLOSE_TODO_EDITOR",
  OPEN_TODO_CREATOR = "OPEN_TODO_CREATOR",
  CLOSE_TODO_CREATOR = "CLOSE_TODO_CREATOR",
}

export interface SortTodoI {
  type: todoActionType.SORT_TODO_BY;
  payload: TodoState["sortedBy"];
}

export interface SortTodoAscI {
  type: todoActionType.SORT_TODO_ASC;
  payload: boolean;
}

export interface CloseTodoEditorI {
  type: todoActionType.CLOSE_TODO_EDITOR;
  payload: null;
}

export interface OpenTodoEditorI {
  type: todoActionType.OPEN_TODO_EDITOR;
  payload: {
    todo: TodoType;
    taskEditorCaller: string;
  };
}

export interface CloseTodoCreatorI {
  type: todoActionType.CLOSE_TODO_CREATOR;
  payload: null;
}

export type TaskCreatorDefaultValues = Partial<Pick<TodoType, "dueDate">>;
export interface openTodoCreatorI {
  type: todoActionType.OPEN_TODO_CREATOR;
  payload: {
    taskCreatorCaller: string;
    taskCreatorDefaultValues?: TaskCreatorDefaultValues;
  };
}

export const sortTodoBy = (sortedBy: TodoState["sortedBy"]): SortTodoI => {
  return {
    type: todoActionType.SORT_TODO_BY,
    payload: sortedBy,
  };
};

export const sortTodoAsc = (asc: boolean): SortTodoAscI => {
  return {
    type: todoActionType.SORT_TODO_ASC,
    payload: asc,
  };
};

export const closeTodoEditor = (): CloseTodoEditorI => {
  return {
    type: todoActionType.CLOSE_TODO_EDITOR,
    payload: null,
  };
};

export const openTodoEditor = (
  todo: TodoType,
  taskEditorCaller: string,
): OpenTodoEditorI => {
  return {
    type: todoActionType.OPEN_TODO_EDITOR,
    payload: {
      todo,
      taskEditorCaller,
    },
  };
};

export const CloseTodoCreator = (): CloseTodoCreatorI => {
  return {
    type: todoActionType.CLOSE_TODO_CREATOR,
    payload: null,
  };
};

export const openTodoCreator = (
  taskCreatorCaller: string,
  taskCreatorDefaultValues?: TaskCreatorDefaultValues,
): openTodoCreatorI => {
  return {
    type: todoActionType.OPEN_TODO_CREATOR,
    payload: {
      taskCreatorCaller,
      taskCreatorDefaultValues,
    },
  };
};

export type TodoAction =
  | SortTodoI
  | SortTodoAscI
  | CloseTodoEditorI
  | OpenTodoEditorI
  | CloseTodoCreatorI
  | openTodoCreatorI;

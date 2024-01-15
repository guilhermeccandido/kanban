import { TodoType } from "@/model/Todo";
import { TodoAction, todoActionType } from "../actions/todoAction";
import { AnyAction } from "redux";

export interface TodoState {
  sortedBy: "priority" | "dueDate" | "plannedFinishDate";
  sortedAsc: boolean;
  isTodoEditorOpen: boolean;
  targetTodo: TodoType | null;
  taskEditorCaller: string;
}

const initialState: TodoState = {
  sortedBy: "priority",
  sortedAsc: true,
  isTodoEditorOpen: false,
  targetTodo: null,
  taskEditorCaller: "",
};

const reducer = (
  state = initialState,
  action: TodoAction | AnyAction,
): TodoState => {
  switch (action.type) {
    case todoActionType.SORT_TODO_BY:
      return {
        ...state,
        sortedBy: action.payload,
        sortedAsc: true,
      };
    case todoActionType.SORT_TODO_ASC:
      return {
        ...state,
        sortedAsc: action.payload,
      };
    case todoActionType.OPEN_TODO_EDITOR:
      return {
        ...state,
        isTodoEditorOpen: true,
        targetTodo: action.payload.todo,
        taskEditorCaller: action.payload.taskEditorCaller,
      };
    case todoActionType.CLOSE_TODO_EDITOR:
      return {
        ...state,
        isTodoEditorOpen: false,
        taskEditorCaller: "",
      };
    default:
      return state;
  }
};

export default reducer;

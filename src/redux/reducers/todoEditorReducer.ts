import { TodoType } from "@/model/Todo";
import {
  TodoEditorAction,
  todoEditorActionType,
} from "../actions/todoEditorAction";

export interface TodoEditorState {
  isTodoEditorOpen: boolean;
  targetTodo: TodoType | null;
  caller: string;
}

const initialState: TodoEditorState = {
  isTodoEditorOpen: false,
  targetTodo: null,
  caller: "",
};

const reducer = (
  state = initialState,
  action: TodoEditorAction,
): TodoEditorState => {
  switch (action.type) {
    case todoEditorActionType.OPEN_TODO_EDITOR:
      return {
        ...state,
        isTodoEditorOpen: true,
        targetTodo: action.payload.todo,
        caller: action.payload.caller,
      };
    case todoEditorActionType.CLOSE_TODO_EDITOR:
      return {
        ...state,
        isTodoEditorOpen: false,
      };
    default:
      return state;
  }
};

export default reducer;

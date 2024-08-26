import {
  TaskCreatorDefaultValues,
  TaskEditType,
  TodoAction,
  todoActionType,
} from "../actions/todoAction";

export interface TodoState {
  isTodoEditorOpen: boolean;
  targetTodo: Todo | TaskCreatorDefaultValues;
  taskEditorCaller: string;
  taskEditType: TaskEditType | null;
}

const initialState: TodoState = {
  isTodoEditorOpen: false,
  targetTodo: {},
  taskEditorCaller: "",
  taskEditType: null,
};

const reducer = (state = initialState, action: TodoAction): TodoState => {
  switch (action.type) {
    case todoActionType.OPEN_TODO_EDITOR:
      return {
        ...state,
        isTodoEditorOpen: true,
        targetTodo:
          action.payload.type === "create"
            ? {
                ...action.payload.todo,
              }
            : action.payload.todo,
        taskEditorCaller: action.payload.taskEditorCaller,
        taskEditType: action.payload.type,
      };
    case todoActionType.CLOSE_TODO_EDITOR:
      return {
        ...state,
        isTodoEditorOpen: false,
        taskEditorCaller: "",
        taskEditType: null,
      };
    default:
      return state;
  }
};

export default reducer;

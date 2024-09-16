import { Todo } from "@prisma/client";
import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { TodoAction, todoActionTypes } from "../actions/todoAction";

export interface TodoState {
  fetched: boolean;
  todos: Todo[];
}

const initialTodoState: TodoState = {
  fetched: false,
  todos: [],
};

const todoReducer = (
  state = initialTodoState,
  action: TodoAction | AnyAction,
): TodoState => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return { ...state, ...action.payload };
    case todoActionTypes.INITIATE_TODOS:
      return { ...state, fetched: true, todos: action.payload };
    case todoActionTypes.ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case todoActionTypes.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;

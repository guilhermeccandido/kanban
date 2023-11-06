import { TodoType } from "@/model/Todo";
import { TodoAction, todoActionType } from "../actions/todoAction";
import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";

export interface TodoState {
    todos: TodoType[];
}

const initialState: TodoState = {
    todos: [],
};

const reducer = (state = initialState, action: TodoAction | AnyAction): TodoState => {
    switch (action.type) {
        case HYDRATE:
            // this will overwrite the existing client state
            return {
                ...state,
                ...action.payload,
            };
        case todoActionType.UPDATE_TODO:
            return {
                ...state,
                todos: action.payload,
            };
        case todoActionType.ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        default:
            return state;
    }
}

export default reducer;

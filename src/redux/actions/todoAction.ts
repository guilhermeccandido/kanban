import { TodoType } from "@/model/Todo";
import { TypedDispatch } from "../store";
import axios from "axios";

export enum todoActionType {
    UPDATE_TODO = "UPDATE_TODO",
    ADD_TODO = "ADD_TODO",
}

export interface UpdateTodoI {
    type: todoActionType.UPDATE_TODO;
    payload: TodoType[];
}

export interface AddTodoI {
    type: todoActionType.ADD_TODO;
    payload: TodoType;
}

export const updateTodo = (todos: TodoType[]): UpdateTodoI => {
    return {
        type: todoActionType.UPDATE_TODO,
        payload: todos,
    }
}

export const addTodo = (todo: TodoType): AddTodoI => {
    return {
        type: todoActionType.ADD_TODO,
        payload: todo,
    }
}

export type TodoAction = UpdateTodoI | AddTodoI;
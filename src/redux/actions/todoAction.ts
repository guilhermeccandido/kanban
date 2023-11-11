import { TodoType } from '@/model/Todo';
import { TodoState } from '../reducers/todoReducer';

export enum todoActionType {
	// UPDATE_TODO = "UPDATE_TODO",
	// ADD_TODO = "ADD_TODO",
	SORT_TODO_BY = 'SORT_TODO_BY',
	SORT_TODO_ASC = 'SORT_TODO_ASC',
}

// export interface UpdateTodoI {
//     type: todoActionType.UPDATE_TODO;
//     payload: TodoType[];
// }

// export interface AddTodoI {
//     type: todoActionType.ADD_TODO;
//     payload: TodoType;
// }

export interface SortTodoI {
	type: todoActionType.SORT_TODO_BY;
	payload: TodoState['sortedBy']
}

export interface SortTodoAscI {
	type: todoActionType.SORT_TODO_ASC;
	payload: boolean;
}

export const sortTodoBy = (sortedBy: TodoState['sortedBy']): SortTodoI => {
	return {
		type: todoActionType.SORT_TODO_BY,
		payload: sortedBy,
	};
}

export const sortTodoAsc = (asc: boolean): SortTodoAscI => {
	return {
		type: todoActionType.SORT_TODO_ASC,
		payload: asc,
	};
}

// export const updateTodo = (todos: TodoType[]): UpdateTodoI => {
//     return {
//         type: todoActionType.UPDATE_TODO,
//         payload: todos,
//     }
// }

// export const addTodo = (todo: TodoType): AddTodoI => {
//     return {
//         type: todoActionType.ADD_TODO,
//         payload: todo,
//     }
// }

export type TodoAction = SortTodoI | SortTodoAscI;

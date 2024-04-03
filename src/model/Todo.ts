import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import mongoose, { Types } from 'mongoose';
import { User } from 'next-auth';

class Todo {
	@prop({ type: () => String, require: true })
	public title!: string;

	@prop({ type: () => String })
	public description?: string;

	@prop({ type: () => String, required: true })
	public state!: 'todo' | 'in-progress' | 'review' | 'done';

	@prop({ type: () => Number })
	public dueDate?: number;

	@prop({ type: () => Number })
	public plannedFinishDate?: number;

	@prop({ type: () => Number })
	public createdAt!: number;

	@prop({ type: () => Number })
	public updatedAt!: number;

	@prop({ ref: () => 'User', required: true })
	public Owner!: Ref<User>;

	@prop({ type: () => Boolean, default: false })
	public isDeleted!: boolean;
}

export type TodoType = Todo & { _id: Types.ObjectId };
const TodoModel = mongoose.models.Todo || getModelForClass(Todo);
export default TodoModel;

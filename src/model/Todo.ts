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

	@prop({ type: () => Date })
	public dueDate?: Date;

	@prop({ type: () => Date })
	public createdAt!: Date;

	@prop({ type: () => Date })
	public updatedAt!: Date;

	@prop({ ref: () => 'User', required: true })
	public Owner!: Ref<User>;
}

export type TodoType = Todo & { _id: Types.ObjectId };
const TodoModel = mongoose.models.Todo || getModelForClass(Todo);
export default TodoModel;

import dayjs, { Dayjs } from 'dayjs';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const TodoCreateValidator = z
	.object({
		title: z.string().min(1).max(100),
		description: z.string().min(1).max(1000).optional(),
		state: z.enum(['todo', 'in-progress', 'review', 'done']),
		dueDate: z.number().int().positive().optional(),
		plannedFinishDate: z.number().int().positive().optional(),
	})
	.refine(
		({ dueDate, plannedFinishDate }) => {
			if (plannedFinishDate && !dueDate) return false;
			if (dueDate && plannedFinishDate) return dueDate > plannedFinishDate;
			return true;
		},
		{
			message: 'plannedFinishDate must be after dueDate',
			path: ['plannedFinishDate'],
		}
	);

export const TodoCheckValidator = z
	.object({
		id: z.custom<ObjectId>(),
	})

export const TodoEditValidator = z.object({
	id: z.custom<ObjectId>(),
	title: z.string().min(1).max(100).optional(),
	description: z.string().min(1).max(1000).optional(),
	state: z.enum(['todo', 'in-progress', 'review', 'done']),
	dueDate: z.number().int().positive().optional(),
	plannedFinishDate: z.number().int().positive().optional(),
}).refine(
	({ dueDate, plannedFinishDate }) => {
		if (plannedFinishDate && !dueDate) return false;
		if (dueDate && plannedFinishDate) return dueDate > plannedFinishDate;
		return true;
	},
	{
		message: 'plannedFinishDate must be after dueDate',
		path: ['plannedFinishDate'],
	}
);

export type TodoCreateRequest = z.infer<typeof TodoCreateValidator>;
export type TodoCheckRequest = z.infer<typeof TodoCheckValidator>;
export type TodoEditRequest = z.infer<typeof TodoEditValidator>;

import { ObjectId } from 'mongodb';
import {z} from 'zod';

export const TodoCreateValidator = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(1000).optional(),
    state: z.enum(['todo', 'in-progress', 'review', 'done']),
    // dueDate: z.instanceof(dayjs as unknown as typeof Dayjs).optional()
    dueDate: z.date().optional(),
    plannedFinishDate: z.date().optional()
})

export const TodoUpdateValidator = z.object({
    id: z.custom<ObjectId>(),
    title: z.string().min(1).max(100).optional(),
    description: z.string().min(1).max(1000).optional(),
    state: z.enum(['todo', 'in-progress', 'review', 'done']).optional(),
    // dueDate: z.instanceof(dayjs as unknown as typeof Dayjs).optional()
    dueDate: z.date().optional(),
    plannedFinishDate: z.date().optional()
})

export type TodoCreateRequest = z.infer<typeof TodoCreateValidator>
export type TodoUpdateRequest = z.infer<typeof TodoUpdateValidator>
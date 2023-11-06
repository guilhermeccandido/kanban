import dayjs, { Dayjs } from 'dayjs';
import {z} from 'zod';

export const TodoValidator = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(1000).optional(),
    state: z.enum(['todo', 'in-progress', 'review', 'done']),
    // dueDate: z.instanceof(dayjs as unknown as typeof Dayjs).optional()
    dueDate: z.date().optional(),
    plannedFinishDate: z.date().optional()
})

export type TodoCreateRequest = z.infer<typeof TodoValidator>
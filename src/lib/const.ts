import { TodoType } from "@/model/Todo";

export const TASK_STATE_OPTIONS: Readonly<
  {
    value: TodoType["state"];
    title: string;
  }[]
> = Object.freeze([
  {
    value: "todo",
    title: "Todo",
  },
  {
    value: "in-progress",
    title: "In Progress",
  },
  {
    value: "review",
    title: "Review",
  },
  {
    value: "done",
    title: "Done",
  },
]);

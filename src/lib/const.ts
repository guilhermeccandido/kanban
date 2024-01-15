import { Option } from "@/components/CustomizedSelect";

export const TASK_STATE_OPTIONS: Readonly<Option[]> = Object.freeze([
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

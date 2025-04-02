import { Todo } from "@prisma/client";

export const TASK_STATE_OPTIONS: Readonly<
  {
    value: Todo["state"];
    title: string;
  }[]
> = Object.freeze([
  {
    value: "TODO",
    title: "Todo",
  },
  {
    value: "IN_PROGRESS",
    title: "In Progress",
  },
  {
    value: "REVIEW",
    title: "Review",
  },
  {
    value: "DONE",
    title: "Done",
  },
]);

export const COLUMN_COLORS: Record<
  Todo["state"],
  { bg: string; header: string }
> = Object.freeze({
  TODO: {
    bg: "bg-blue-50 dark:bg-blue-950",
    header: "bg-blue-100 dark:bg-blue-900",
  },
  IN_PROGRESS: {
    bg: "bg-amber-50 dark:bg-amber-950",
    header: "bg-amber-100 dark:bg-amber-900",
  },
  REVIEW: {
    bg: "bg-purple-50 dark:bg-purple-950",
    header: "bg-purple-100 dark:bg-purple-900",
  },
  DONE: {
    bg: "bg-green-50 dark:bg-green-950",
    header: "bg-green-100 dark:bg-green-900",
  },
});

export const PROJECT_COLORS = [
  {
    bg: "bg-blue-500",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    bg: "bg-purple-500",
    badge:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  {
    bg: "bg-green-500",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  {
    bg: "bg-teal-500",
    badge: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  },
  {
    bg: "bg-amber-500",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  },
  {
    bg: "bg-red-500",
    badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  {
    bg: "bg-pink-500",
    badge: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  },
];

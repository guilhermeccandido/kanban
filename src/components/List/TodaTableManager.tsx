"use client";

import { selectNotDeletedTodos } from "@/redux/selector/todoSelector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoTable from "./TodoTable";
import { Todo } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

const TodoTableManager = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const todos = useSelector(selectNotDeletedTodos);

  const todoColumns: ColumnDef<Todo>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          <span className="mr-2">Title</span>
          <ArrowUpDown size={16} />
        </Button>
      ),
    },
    {
      accessorKey: "state",
      header: "State",
    },
    {
      accessorKey: "deadline",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          <span className="mr-2">Deadline</span>
          <ArrowUpDown size={16} />
        </Button>
      ),
      cell: ({ row }) => {
        if (!row.original.deadline) return null;

        return dayjs(row.original.deadline).format("YYYY/MM/DD");
      },
    },
    {
      accessorKey: "label",
      header: "Label",
      cell: ({ row }) => {
        if (!row.original.label) return null;

        return (
          <div className="flex gap-2 flex-wrap max-w-xs">
            {row.original.label.map((label) => {
              return (
                <span
                  key={label}
                  className="px-2 rounded-sm bg-gray-200 leading-5 max-w-[75px] flex-wrap overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {label}
                </span>
              );
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          <span className="mr-2">Created At</span>
          <ArrowUpDown size={16} />
        </Button>
      ),
      cell: ({ row }) => {
        return dayjs(row.original.createdAt).format("YYYY/MM/DD");
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          <span className="mr-2">Updated At</span>
          <ArrowUpDown size={16} />
        </Button>
      ),
      cell: ({ row }) => {
        return dayjs(row.original.updatedAt).format("YYYY/MM/DD");
      },
    },
  ];

  if (!isMounted) return null;

  return (
    <>
      <TodoTable columns={todoColumns} data={todos} />
    </>
  );
};

export default TodoTableManager;

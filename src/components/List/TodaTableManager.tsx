"use client";

import { selectNotDeletedTodos } from "@/redux/selector/todoSelector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoTable from "./TodoTable";
import { Todo } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

const TodoTableManager = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const todos = useSelector(selectNotDeletedTodos);

  const todoColumns: ColumnDef<Todo>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "state",
      header: "State",
    },
    {
      accessorKey: "deadline",
      header: "Deadline",
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
      header: "Created At",
      cell: ({ row }) => {
        return dayjs(row.original.createdAt).format("YYYY/MM/DD");
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
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

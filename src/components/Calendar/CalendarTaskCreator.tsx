"use client";

import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { openTodoEditor } from "@/redux/actions/todoAction";

const CalendarTaskCreator = () => {
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    dispatch(openTodoEditor({}, "/calendar", "create"));
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg flex items-center p2 text-foreground hover:bg-zinc-100 cursor-pointer p-1"
      onClick={handleOpenDialog}
    >
      <Plus color="#808080" />
    </div>
  );
};

export default CalendarTaskCreator;

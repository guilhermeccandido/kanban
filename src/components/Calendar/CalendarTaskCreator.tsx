"use client";

import { openTodoCreator } from "@/redux/actions/todoAction";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";

const CalendarTaskCreator = () => {
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    dispatch(openTodoCreator("/calendar"));
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

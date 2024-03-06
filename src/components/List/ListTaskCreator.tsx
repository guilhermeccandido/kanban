"use client";

import { openTodoCreator } from "@/redux/actions/todoAction";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";

const ListTaskCreator = () => {
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    dispatch(openTodoCreator("/list"));
  };

  return (
    <>
      <div
        className="absolute left-1/2 -translate-x-1/2 w-11/12 h-10 bg-white bottom-20 rounded-xl shadow-lg flex items-center p-2 text-foreground hover:bg-zinc-100 cursor-pointer"
        onClick={handleOpenDialog}
      >
        <Plus color="#808080" />
      </div>
    </>
  );
};

export default ListTaskCreator;

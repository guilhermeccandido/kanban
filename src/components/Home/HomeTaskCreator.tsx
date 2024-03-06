"use client";

import { TodoType } from "@/model/Todo";
import { openTodoCreator } from "@/redux/actions/todoAction";
import { Plus } from "lucide-react";
import { FC } from "react";
import { useDispatch } from "react-redux";

type HomeTaskCreatorProps = {
  state: TodoType["state"];
};

const HomeTaskCreator: FC<HomeTaskCreatorProps> = ({ state }) => {
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    dispatch(openTodoCreator("/", { state }));
  };

  return (
    <div
      className="mx-auto w-11/12 h-10 bg-white bottom-4 rounded-sm flex items-center p-2 text-foreground hover:bg-zinc-100 cursor-pointer"
      onClick={handleOpenDialog}
    >
      <Plus color="#808080" />{" "}
      <span className="pl-0.5 text-[#808080]">Create Todo</span>
    </div>
  );
};

export default HomeTaskCreator;

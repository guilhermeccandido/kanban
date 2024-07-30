import ListTaskCreator from "@/components/List/ListTaskCreator";
import TaskCreator from "@/components/List/TaskCreator";
import TaskSorter from "@/components/List/TaskSorter";
import SideNavOpener from "@/components/SideNavOpener";
import dbConnect from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuthOptions";
import TodoModel, { TodoType } from "@/model/Todo";
import { List } from "lucide-react";
import dynamic from "next/dynamic";

const Tasks = dynamic(() => import("@/components/List/Tasks"), { ssr: false });

const Home = async () => {
  const session = await getAuthSession();
  let unFinishedTodos: TodoType[] = [];
  let finishedTodos: TodoType[] = [];
  if (session?.user) {
    const { user } = session;
    await dbConnect();
    const result = await TodoModel.find({
      Owner: user.id,
      isDeleted: false,
    })
      .select({
        title: 1,
        state: 1,
        _id: 1,
        dueDate: 1,
        plannedFinishDate: 1,
        description: 1,
      })
      .sort({ createdAt: -1 })
      .exec();
    const todo = JSON.parse(JSON.stringify(result));
    unFinishedTodos = todo.filter(
      (todo) => todo.state === "todo" || todo.state === "in-progress",
    );

    finishedTodos = todo.filter(
      (todo) => todo.state === "review" || todo.state === "done",
    );
  }

  return (
    <div className="h-full">
      <div className="flex items-center pb-4 pb-8 justify-between">
        <div className="flex">
          <SideNavOpener pageIcon={<List />} />
          <div className="pl-3 text-base">List</div>
        </div>
        <TaskSorter />
      </div>
      <Tasks unFinishedTodos={unFinishedTodos} finishedTodos={finishedTodos} />
      <ListTaskCreator />
    </div>
  );
};

export default Home;

import TodoColumnManager from "@/components/Home/TodoColumnManager";
import SideNavOpener from "@/components/SideNavOpener";
import dbConnect from "@/lib/db";
import { getAuthSession } from "@/lib/nextauthOptions";
import TodoModel, { TodoType } from "@/model/Todo";
import { HomeIcon } from "lucide-react";

const Home = async () => {
  const session = await getAuthSession();
  let todos: TodoType[] = [];
  if (session?.user) {
    const { user } = session;
    await dbConnect();
    const result = await TodoModel.find({
      Owner: user.id,
      isDeleted: false,
    })
      .select({ title: 1, state: 1, _id: 1, dueDate: 1, plannedFinishDate: 1, description: 1 })
      .sort({ createdAt: -1 })
      .exec();
    todos = JSON.parse(JSON.stringify(result));
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center pb-8 justify-between flex-none">
        <div className="flex">
          <SideNavOpener pageIcon={<HomeIcon />} />
          <div className="pl-3 text-base">Todo</div>
        </div>
      </div>
      <div className="h-[90%] flex-auto">
        <TodoColumnManager todos={todos} />
      </div>
    </div>
  );
};

export default Home;

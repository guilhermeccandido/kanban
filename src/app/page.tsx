import TodoColumnManager from "@/components/Home/TodoColumnManager";
import SideNavOpener from "@/components/SideNavOpener";
import { TASK_STATE_OPTIONS } from "@/lib/const";
import dbConnect from "@/lib/db";
import { getAuthSession } from "@/lib/nextAuthOptions";
import TodoModel, { TodoType } from "@/model/Todo";
import { HomeIcon } from "lucide-react";

const Home = async () => {
  const session = await getAuthSession();
  const initialTodo: Record<TodoType["state"], TodoType[]> =
    TASK_STATE_OPTIONS.reduce<Record<TodoType["state"], TodoType[]>>(
      (acc, { value }) => {
        acc[value] = [];
        return acc;
      },
      {} as Record<TodoType["state"], TodoType[]>,
    );
  let todos = initialTodo;
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
        order: 1,
      })
      .sort({ order: 1 })
      .exec();
    const allTodo: TodoType[] = JSON.parse(JSON.stringify(result));

    todos = allTodo.reduce<Record<TodoType["state"], TodoType[]>>(
      (acc, todo) => {
        if (!Object.prototype.hasOwnProperty.call(acc, todo.state)) {
          acc[todo.state] = [todo];
        } else {
          acc[todo.state].push(todo);
        }
        return acc;
      },
      initialTodo,
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center pb-4 sm:pb-8 justify-between flex-none">
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

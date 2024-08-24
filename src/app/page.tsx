import TodoColumnManager from "@/components/Home/TodoColumnManager";
import SideNavOpener from "@/components/SideNavOpener";
import { TASK_STATE_OPTIONS } from "@/lib/const";
import { getAuthSession } from "@/lib/nextAuthOptions";
import { HomeIcon } from "lucide-react";
import prisma from "@/lib/prismadb";
import { Todo } from "@prisma/client";

const Home = async () => {
  const session = await getAuthSession();
  const initialTodo: Record<Todo["state"], Todo[]> = TASK_STATE_OPTIONS.reduce<
    Record<Todo["state"], Todo[]>
  >(
    (acc, { value }) => {
      acc[value] = [];
      return acc;
    },
    {} as Record<Todo["state"], Todo[]>,
  );
  let todos = initialTodo;
  if (session?.user) {
    const { user } = session;
    const result = await prisma.todo.findMany({
      where: {
        ownerId: user.id,
        isDeleted: false,
      },
      select: {
        id: true,
        title: true,
        state: true,
        deadline: true,
        description: true,
        order: true,
        label: true,
      },
      orderBy: {
        order: "asc",
      },
    });
    const allTodo: Todo[] = JSON.parse(JSON.stringify(result));

    todos = allTodo.reduce<Record<Todo["state"], Todo[]>>((acc, todo) => {
      if (!Object.prototype.hasOwnProperty.call(acc, todo.state)) {
        acc[todo.state] = [todo];
      } else {
        acc[todo.state].push(todo);
      }
      return acc;
    }, initialTodo);
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

import TodoColumnManager from "@/components/Home/TodoColumnManager";
import SideNavOpener from "@/components/SideNavOpener";
import TodoWrapper from "@/components/TodoWrapper";
import { getAuthSession } from "@/lib/nextAuthOptions";
import { todoFetchRequest } from "@/requests/todoFetchRequest";
import { HomeIcon } from "lucide-react";

const Home = async () => {
  const sesison = await getAuthSession();
  const todos = await todoFetchRequest(sesison);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center pb-4 sm:pb-8 justify-between flex-none">
        <div className="flex">
          <SideNavOpener pageIcon={<HomeIcon />} />
          <div className="pl-3 text-base">Todo</div>
        </div>
      </div>
      <div className="h-[90%] flex-auto">
        <TodoWrapper todos={todos}>
          <TodoColumnManager />
        </TodoWrapper>
      </div>
    </div>
  );
};

export default Home;

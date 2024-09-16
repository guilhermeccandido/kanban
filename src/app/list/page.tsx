import AppSubHeader from "@/components/AppSubHeader";
import TodoTableManager from "@/components/List/TodaTableManager";
import TodoWrapper from "@/components/TodoWrapper";
import { getAuthSession } from "@/lib/nextAuthOptions";
import { todoFetchRequest } from "@/requests/todoFetchRequest";

const List = async () => {
  const session = await getAuthSession();
  const todos = await todoFetchRequest(session);

  return (
    <div className="h-[92.5%] sm:h-[95%] flex flex-col">
      <AppSubHeader title="List" link="/list" />
      <TodoWrapper todos={todos}>
        <TodoTableManager />
      </TodoWrapper>
    </div>
  );
};

export default List;

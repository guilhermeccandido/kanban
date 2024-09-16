import AppSubHeader from "@/components/AppSubHeader";
import TodoColumnManager from "@/components/Home/TodoColumnManager";
import TodoWrapper from "@/components/TodoWrapper";
import { getAuthSession } from "@/lib/nextAuthOptions";
import store from "@/redux/store";
import { todoFetchRequest } from "@/requests/todoFetchRequest";

const Home = async () => {
  const sesison = await getAuthSession();
  const todos = await todoFetchRequest(sesison);
  console.log(store.getState().todo)

  return (
    <div className="h-full flex flex-col">
      <AppSubHeader title="Board" link="/" />
      <div className="h-[90%] flex-auto">
        <TodoWrapper todos={todos}>
          <TodoColumnManager />
        </TodoWrapper>
      </div>
    </div>
  );
};

export default Home;

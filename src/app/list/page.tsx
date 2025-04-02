import AppLayout from "@/components/AppLayout";
import TodoTableManager from "@/components/List/TodaTableManager";
import TodoWrapper from "@/components/TodoWrapper";

const List = async () => {
  return (
    <AppLayout title="List">
      <div className="h-[92.5%] sm:h-[95%] flex flex-col">
        <TodoWrapper todos={[]}>
          <TodoTableManager />
        </TodoWrapper>
      </div>
    </AppLayout>
  );
};

export default List;

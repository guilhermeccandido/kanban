import AppLayout from "@/components/AppLayout";
import TodoColumnManager from "@/components/Home/TodoColumnManager";

const Home = () => {
  return (
    <AppLayout title="Board">
      <div className="h-full flex flex-col">
        <TodoColumnManager />
      </div>
    </AppLayout>
  );
};

export default Home;

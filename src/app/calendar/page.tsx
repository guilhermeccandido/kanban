import CalendarTaskCreator from "@/components/Calendar/CalendarTaskCreator";
import TodoCalendar from "@/components/Calendar/TodoCalendar";
import SideNavOpener from "@/components/SideNavOpener";
import { getAuthSession } from "@/lib/nextAuthOptions";
import { Todo } from "@prisma/client";
import { HomeIcon } from "lucide-react";

const Calendar = async () => {
  const session = await getAuthSession();
  let todos: Todo[] = [];
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
    todos = JSON.parse(JSON.stringify(result));
  }

  return (
    <div className="h-[92.5%] sm:h-[95%] flex flex-col">
      <div className="flex items-center pb-4 sm:pb-8 justify-between flex-none">
        <div className="flex">
          <SideNavOpener pageIcon={<HomeIcon />} />
          <div className="pl-3 text-base">Calendar</div>
        </div>
        <CalendarTaskCreator />
      </div>
      <TodoCalendar todos={todos} />
    </div>
  );
};

export default Calendar;

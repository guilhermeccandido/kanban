import CalendarTaskCreator from "@/components/Calendar/CalendarTaskCreator";
import TodoCalendar from "@/components/Calendar/TodoCalendar";
import SideNavOpener from "@/components/SideNavOpener";
import TodoWrapper from "@/components/TodoWrapper";
import { getAuthSession } from "@/lib/nextAuthOptions";
import { todoFetchRequest } from "@/requests/todoFetchRequest";
import { Todo } from "@prisma/client";
import { HomeIcon } from "lucide-react";

const Calendar = async () => {
  const session = await getAuthSession();
  const todos = await todoFetchRequest(session);

  return (
    <div className="h-[92.5%] sm:h-[95%] flex flex-col">
      <div className="flex items-center pb-4 sm:pb-8 justify-between flex-none">
        <div className="flex">
          <SideNavOpener pageIcon={<HomeIcon />} />
          <div className="pl-3 text-base">Calendar</div>
        </div>
        <CalendarTaskCreator />
      </div>
      <TodoWrapper todos={todos}>
        <TodoCalendar />
      </TodoWrapper>
    </div>
  );
};

export default Calendar;

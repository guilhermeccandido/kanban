"use client";

import { TodoType } from "@/model/Todo";
import dayjs from "dayjs";
import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import DayCell from "./DayCell";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TaskEditor from "../Home/TaskEditor";
import useResize from "@/hooks/useResize";

type TodoCalendarProps = {
  todos: TodoType[];
};

export type TodoOfDay = {
  deadline: TodoType[];
  plannedDeadline: TodoType[];
  finished: TodoType[];
};

type TodoHashmap = {
  [key: string]: TodoOfDay;
};

const HEIGHT_OF_CELL_TASK = 26;

const TodoCalendar: FC<TodoCalendarProps> = ({ todos }) => {
  const MAX_CELL_FOR_FIVE_ROW = 35;
  const MAX_CELL_FOR_SIX_ROW = 42;
  const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1);
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [todoHashmap, setTodoHashmap] = useState<TodoHashmap>({});
  const [numberOfTaskdisplaying, setNumberOfTaskdisplaying] = useState(3);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { height: calendarHeight } = useResize({
    el: calendarRef?.current,
  });

  const numberOfRow = Math.ceil(
    (dayjs().year(currentYear).month(currentMonth).startOf("month").day() +
      dayjs().month(currentMonth).daysInMonth()) /
      7,
  );

  useLayoutEffect(() => {
    const newNumberOfTaskdisplaying = Math.trunc(
      (calendarHeight / numberOfRow - 20) / HEIGHT_OF_CELL_TASK - 1,
    );
    setNumberOfTaskdisplaying(newNumberOfTaskdisplaying);
  }, [calendarHeight, numberOfRow]);

  const updateTodoHashmap = useCallback(() => {
    if (todos.length === 0) return;
    const tempHashmap: TodoHashmap = {};
    todos.forEach((todo) => {
      const deadline =
        typeof todo.dueDate !== "undefined"
          ? dayjs(todo.dueDate).format("YYYY-MM-DD")
          : "";
      const plannedDeadline =
        typeof todo.plannedFinishDate !== "undefined"
          ? dayjs(todo.plannedFinishDate).format("YYYY-MM-DD")
          : "";

      if (todo.state !== "todo" && deadline !== "") {
        if (deadline in tempHashmap) {
          tempHashmap[deadline].finished.push(todo);
          return;
        } else {
          tempHashmap[deadline] = {
            deadline: [],
            plannedDeadline: [],
            finished: [todo],
          };
          return;
        }
      }

      if (deadline !== "") {
        if (deadline in tempHashmap) {
          tempHashmap[deadline].deadline.push(todo);
        } else {
          tempHashmap[deadline] = {
            deadline: [todo],
            plannedDeadline: [],
            finished: [],
          };
        }
      }
      if (plannedDeadline !== "") {
        if (plannedDeadline in tempHashmap) {
          tempHashmap[plannedDeadline].plannedDeadline.push(todo);
        } else {
          tempHashmap[plannedDeadline] = {
            deadline: [],
            plannedDeadline: [todo],
            finished: [],
          };
        }
      }
    });
    setTodoHashmap(tempHashmap);
  }, [todos, setTodoHashmap]);

  useEffect(() => {
    updateTodoHashmap();
  }, [todos, currentYear, currentMonth, updateTodoHashmap]);

  const renderCalendarDays = (
    currentYear: number,
    currentMonth: number,
    todoHashmap: TodoHashmap,
  ) => {
    const daysInMonth = dayjs()
      .month(currentMonth - 1)
      .daysInMonth();
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const prevMonthYear = currentYear - (currentMonth === 1 ? 1 : 0);
    const nextMonth = (currentMonth + 1) % 13;
    const nextMonthYear = currentYear + (currentMonth === 12 ? 1 : 0);

    const daysArray = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1,
    );

    const firstDayOfMonth = dayjs()
      .year(currentYear)
      .month(currentMonth - 1)
      .startOf("month")
      .day();
    const daysInPrevMonth = dayjs()
      .year(currentYear)
      .month(currentMonth - 1)
      .subtract(1, "month")
      .daysInMonth();

    const prevMonthCells = Array.from(
      { length: firstDayOfMonth },
      (_, index) => {
        const day = daysInPrevMonth - firstDayOfMonth + index + 1;
        const dayCode = `${prevMonthYear}-${
          prevMonth >= 10 ? prevMonth : "0" + prevMonth
        }-${day}`;
        const todos = dayCode in todoHashmap ? todoHashmap[dayCode] : undefined;
        return (
          <DayCell
            key={`prev-${day}`}
            day={day}
            todos={todos}
            numberOfTaskdisplaying={numberOfTaskdisplaying}
          />
        );
      },
    );

    const nextMonthCells = Array.from(
      {
        length:
          (MAX_CELL_FOR_FIVE_ROW - daysInMonth - firstDayOfMonth > 0
            ? MAX_CELL_FOR_FIVE_ROW
            : MAX_CELL_FOR_SIX_ROW) -
          daysInMonth -
          prevMonthCells.length,
      },
      (_, index) => {
        const dayCode = `${nextMonthYear}-${
          nextMonth >= 10 ? nextMonth : "0" + nextMonth
        }-${index}`;
        const todos = dayCode in todoHashmap ? todoHashmap[dayCode] : undefined;
        return (
          <DayCell
            key={`next-${index + 1}`}
            day={index + 1}
            todos={todos}
            numberOfTaskdisplaying={numberOfTaskdisplaying}
          />
        );
      },
    );

    const calendarDays = daysArray.map((day, index) => {
      const dayCode = `${currentYear}-${
        currentMonth >= 10 ? currentMonth : "0" + currentMonth
      }-${day}`;
      const todos = dayCode in todoHashmap ? todoHashmap[dayCode] : undefined;
      return (
        <DayCell
          key={`curr-${day}`}
          day={day}
          todos={todos}
          numberOfTaskdisplaying={numberOfTaskdisplaying}
        />
      );
    });
    const allCells = [...prevMonthCells, ...calendarDays, ...nextMonthCells];

    const rows: JSX.Element[][] = [];
    let cells: JSX.Element[] = [];

    allCells.forEach((cell, index) => {
      if (index % 7 !== 0 || index === 0) {
        cells.push(cell);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(cell);
      }
      if (index === allCells.length - 1) {
        rows.push(cells);
      }
    });

    return rows.map((row, index) => (
      <div className="flex justify-around flex-1 overflow-hidden" key={index}>
        {row}
      </div>
    ));
  };

  const getWeekdayHeaders = () => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekdays.map((weekday) => (
      <div
        className="text-center flex-1 border-zinc-300 border-r border-b"
        key={weekday}
      >
        <span>{weekday}</span>
      </div>
    ));
  };

  const handleChangeToNextMonth = () => {
    const nextMonth = (currentMonth % 12) + 1;
    if (nextMonth === 1) {
      setCurrentYear((prev) => prev + 1);
    }
    setCurrentMonth(nextMonth);
  };

  const handleChangeToPrevMonth = () => {
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    if (prevMonth === 12) {
      setCurrentYear((prev) => prev - 1);
    }
    setCurrentMonth(prevMonth);
  };

  return (
    <div className="flex flex-col gap-2 flex-auto">
      <div className="flex justify-between items-center flex-none">
        <button onClick={handleChangeToPrevMonth}>
          <ChevronLeft size={20} />
        </button>
        <span className="text-lg font-semibold">
          {dayjs()
            .month(currentMonth - 1)
            .format("MMMM")}{" "}
          {currentYear}
        </span>
        <button onClick={handleChangeToNextMonth}>
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex flex-col gap-2 flex-auto border-zinc-300 border-l border-t">
        <div className="w-full flex flex-col h-full">
          <div className="flex justify-around">{getWeekdayHeaders()}</div>
          <div className="flex flex-col flex-1" ref={calendarRef}>
            {renderCalendarDays(currentYear, currentMonth, todoHashmap)}
          </div>
        </div>
      </div>
      <TaskEditor />
    </div>
  );
};

export default TodoCalendar;

"use client";

import useResize from "@/hooks/useResize";
import { selectTodos } from "@/redux/selector/todoSelector";
import { Todo } from "@prisma/client";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import DayCell from "./DayCell";

const HEIGHT_OF_CELL_TASK = 26;
const MAX_CELL_FOR_FIVE_ROW = 35;
const MAX_CELL_FOR_SIX_ROW = 42;
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type TodoOfDay = {
  deadline: Todo[];
  finished: Todo[];
};

type TodoHashmap = {
  [key: string]: TodoOfDay;
};

const TodoCalendar: FC = () => {
  const todos = useSelector(selectTodos);
  const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1);
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [todoHashmap, setTodoHashmap] = useState<TodoHashmap>({});

  const calendarRef = useRef<HTMLDivElement>(null);
  const { height: calendarHeight } = useResize({ el: calendarRef?.current });

  const numberOfRows = useMemo(() => {
    const firstDay = dayjs()
      .year(currentYear)
      .month(currentMonth - 1)
      .startOf("month")
      .day();
    const daysInMonth = dayjs()
      .month(currentMonth - 1)
      .daysInMonth();
    return Math.ceil((firstDay + daysInMonth) / 7);
  }, [currentMonth, currentYear]);

  const numberOfTaskdisplaying = useMemo(() => {
    return Math.trunc(
      (calendarHeight / numberOfRows - 40) / HEIGHT_OF_CELL_TASK,
    );
  }, [calendarHeight, numberOfRows]);

  const updateTodoHashmap = useCallback(() => {
    if (todos.length === 0) return;

    const newHashmap: TodoHashmap = {};
    todos.forEach((todo) => {
      const deadline = todo.deadline
        ? dayjs(todo.deadline).format("YYYY-MM-DD")
        : "";

      if (!deadline) return;

      const isFinished = todo.state !== "TODO";
      if (!newHashmap[deadline]) {
        newHashmap[deadline] = { deadline: [], finished: [] };
      }

      if (isFinished) {
        newHashmap[deadline].finished.push(todo);
      } else {
        newHashmap[deadline].deadline.push(todo);
      }
    });

    setTodoHashmap(newHashmap);
  }, [todos]);

  useEffect(() => {
    updateTodoHashmap();
  }, [todos, currentMonth, currentYear, updateTodoHashmap]);

  const handleChangeMonth = (isNext: boolean) => {
    setCurrentMonth((prevMonth) => {
      const newMonth = isNext
        ? (prevMonth % 12) + 1
        : prevMonth === 1
          ? 12
          : prevMonth - 1;
      if (newMonth === 1 && isNext) setCurrentYear((prev) => prev + 1);
      if (newMonth === 12 && !isNext) setCurrentYear((prev) => prev - 1);
      return newMonth;
    });
  };

  const renderWeekdayHeaders = useMemo(
    () =>
      WEEKDAYS.map((weekday) => (
        <div
          className="text-center flex-1 border-zinc-300 border-r border-b"
          key={weekday}
        >
          <span>{weekday}</span>
        </div>
      )),
    [],
  );

  const renderCalendarDays = useMemo(() => {
    const today = dayjs().format("YYYY-MM-DD");
    const daysInMonth = dayjs()
      .year(currentYear)
      .month(currentMonth - 1)
      .daysInMonth();
    const firstDayOfMonth = dayjs()
      .year(currentYear)
      .month(currentMonth - 1)
      .startOf("month")
      .day();
    const prevMonthDays = dayjs()
      .year(currentYear)
      .month(currentMonth - 2)
      .daysInMonth();

    const generateDayCode = (year: number, month: number, day: number) =>
      `${year}-${month >= 10 ? month : "0" + month}-${day >= 10 ? day : "0" + day}`;

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
      (day) => {
        const dayCode = generateDayCode(currentYear, currentMonth, day);
        return (
          <DayCell
            key={dayCode}
            dayCode={dayCode}
            todos={todoHashmap[dayCode]}
            numberOfTaskdisplaying={numberOfTaskdisplaying}
            today={dayCode === today}
          />
        );
      },
    );

    const prevMonthCells = Array.from({ length: firstDayOfMonth }, (_, i) => {
      const day = prevMonthDays - firstDayOfMonth + i + 1;
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const year = currentMonth === 1 ? currentYear - 1 : currentYear;
      const dayCode = generateDayCode(year, prevMonth, day);
      return (
        <DayCell
          key={dayCode}
          dayCode={dayCode}
          todos={todoHashmap[dayCode]}
          numberOfTaskdisplaying={numberOfTaskdisplaying}
          today={dayCode === today}
        />
      );
    });

    const totalCells = prevMonthCells.length + daysArray.length;
    const nextMonthCells = Array.from(
      {
        length:
          (totalCells > MAX_CELL_FOR_FIVE_ROW
            ? MAX_CELL_FOR_SIX_ROW
            : MAX_CELL_FOR_FIVE_ROW) - totalCells,
      },
      (_, i) => {
        const nextMonth = (currentMonth % 12) + 1;
        const year = currentMonth === 12 ? currentYear + 1 : currentYear;
        const dayCode = generateDayCode(year, nextMonth, i + 1);
        return (
          <DayCell
            key={dayCode}
            dayCode={dayCode}
            todos={todoHashmap[dayCode]}
            numberOfTaskdisplaying={numberOfTaskdisplaying}
            today={dayCode === today}
          />
        );
      },
    );

    const allCells = [...prevMonthCells, ...daysArray, ...nextMonthCells];
    return Array.from({ length: allCells.length / 7 }, (_, i) => (
      <div className="flex justify-around flex-1 overflow-hidden" key={i}>
        {allCells.slice(i * 7, i * 7 + 7)}
      </div>
    ));
  }, [currentMonth, currentYear, todoHashmap, numberOfTaskdisplaying]);

  return (
    <div className="flex flex-col gap-2 flex-auto">
      <div className="flex justify-between items-center flex-none">
        <button onClick={() => handleChangeMonth(false)}>
          <ChevronLeft size={20} />
        </button>
        <span className="text-lg font-semibold">
          {dayjs()
            .month(currentMonth - 1)
            .format("MMMM")}{" "}
          {currentYear}
        </span>
        <button onClick={() => handleChangeMonth(true)}>
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex flex-col gap-2 flex-auto border-zinc-300 border-l border-t">
        <div className="w-full flex flex-col h-full">
          <div className="flex justify-around">{renderWeekdayHeaders}</div>
          <div className="flex flex-col flex-1" ref={calendarRef}>
            {renderCalendarDays}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCalendar;

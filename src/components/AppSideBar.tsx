"use client";

import { cn } from "@/lib/utils";
import { BarChart2, Clock, ListIcon, Menu, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useQuery } from "react-query";
import todoLabelFetchRequest from "@/requests/todoLabelFetchRequest";
import { getLabelColor } from "@/lib/color";

type NavContent = {
  title: string;
  icon: ForwardRefExoticComponent<any>;
  link: string;
};

const NAV_CONTENT: NavContent[] = [
  {
    title: "Board",
    icon: Tag,
    link: "/",
  },
  {
    title: "Dashboard",
    icon: BarChart2,
    link: "/dashboard",
  },
  {
    title: "List",
    icon: ListIcon,
    link: "/list",
  },
  {
    title: "Timeline",
    icon: Clock,
    link: "/timeline",
  },
];

// const projectItems = [
//   {
//     path: "/?filter=Self-Project",
//     label: "Self-Project",
//     color: "bg-blue-500",
//   },
//   { path: "/?filter=EasyBoard", label: "EasyBoard", color: "bg-purple-500" },
//   { path: "/?filter=KTodo", label: "KTodo", color: "bg-teal-500" },
//   { path: "/?filter=FYP", label: "FYP", color: "bg-red-500" },
// ];

const AppSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { data: labels } = useQuery({
    queryKey: ["labels"],
    queryFn: todoLabelFetchRequest,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Only handle clicks outside when the sidebar is open on mobile
      if (
        window.innerWidth < 768 &&
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    function handleResize() {
      // Auto-expand sidebar on larger screens
      if (window.innerWidth >= 1024 && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "bg-white dark:bg-gray-900 h-full transition-all duration-300 border-r dark:border-gray-800 z-10",
        isSidebarOpen ? "w-64" : "w-16",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
        {isSidebarOpen && (
          <h1
            className={cn(
              "font-bold text-xl text-teal-600 dark:text-teal-400 transition-opacity duration-300",
              isSidebarOpen ? "opacity-100" : "opacity-0 absolute",
            )}
          >
            KTodo
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 w-8 h-8 flex items-center justify-center"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4">
        <nav className="space-y-2">
          {NAV_CONTENT.map((item) => (
            <Link key={item.link} href={item.link} className="block">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                  pathname === item.link &&
                    "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
                  !isSidebarOpen && "justify-center p-0",
                )}
              >
                <item.icon className={cn("h-5 w-5", isSidebarOpen && "mr-2")} />
                {isSidebarOpen && <span>{item.title}</span>}
              </Button>
            </Link>
          ))}
        </nav>

        {isSidebarOpen && (
          <div className="mt-8">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Projects
            </h3>
            <div className="space-y-1">
              {labels?.map((label) => (
                <Link key={label} href={`/?filter=${label}`} className="block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${getLabelColor(label).bg} mr-2`}
                    ></span>
                    <span>{label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppSideBar;

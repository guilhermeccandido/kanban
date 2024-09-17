"use client";

import useClickOutSide from "@/hooks/useClickOutSide";
import useResize from "@/hooks/useResize";
import { cn } from "@/lib/utils";
import { closeSideBar } from "@/redux/actions/appAction";
import { ReduxState } from "@/redux/store";
import { Calendar, Columns3, ListIcon, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

type NavContent = {
  title: string;
  icon: JSX.Element;
  link: string;
};

const NAV_CONTENT: NavContent[] = [
  {
    title: "Board",
    icon: <Columns3 />,
    link: "/",
  },
  {
    title: "Calendar",
    icon: <Calendar />,
    link: "/calendar",
  },
  {
    title: "List",
    icon: <ListIcon />,
    link: "/list",
  },
];

const AppSideBar = () => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const isOpen = useSelector<ReduxState, boolean>(
    (state) => state.app.isSideBarOpen,
  );
  const currentPath = usePathname();

  const dispatch = useDispatch();
  const size = useResize({ el: window });

  const usingDrawer = size.width < 768;

  const handleCloseDrawer = useCallback(() => {
    dispatch(closeSideBar());
  }, [dispatch]);
  useClickOutSide(drawerRef, handleCloseDrawer);

  const content = useMemo(() => {
    return (
      <div className="flex flex-col gap-1">
        {NAV_CONTENT.map((content, index) => {
          return (
            <div
              key={index}
              className={cn(
                "px-2 pb-1 pt-2 rounded-md hover:bg-secondary",
                content.link === currentPath
                  ? "bg-secondary text-white"
                  : "bg-transparent",
              )}
            >
              <Link href={content.link} passHref legacyBehavior>
                <a
                  onClick={handleCloseDrawer}
                  className="flex gap-5 content-center pb-1"
                >
                  <span>{content.icon}</span>
                  <span>{content.title}</span>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }, [handleCloseDrawer, currentPath]);

  if (!isOpen) return null;

  return usingDrawer ? (
    <>
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-zinc-500/30 backdrop-blur-[1px]" />
      <div
        className="absolute top-0 left-0 container bg-white w-72 h-full mx-0 opacity-100 z-20"
        ref={drawerRef}
      >
        <div className="pt-[3.25rem] pb-5">
          <div className="w-6 h-6 cursor-pointer">
            <Menu onClick={handleCloseDrawer} />
          </div>
        </div>

        {content}
      </div>
    </>
  ) : (
    <div className="container pt-12 bg-white w-72 h-full mx-0 z-20 min-w-[260px] max-w-[260px]">
      <div className="pb-5 pt-1">
        <div className="w-6 h-6 cursor-pointer">
          <Menu onClick={handleCloseDrawer} />
        </div>
      </div>
      {content}
    </div>
  );
};

export default AppSideBar;

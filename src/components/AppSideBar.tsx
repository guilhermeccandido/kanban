"use client";

import useResize from "@/hooks/useResize";
import { closeSideBar } from "@/redux/actions/appAction";
import { ReduxState } from "@/redux/store";
import { Calendar, Dumbbell, List, Menu } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

type NavContent = {
  title: string;
  icon: JSX.Element;
  link: string;
};

const NAV_CONTENT: NavContent[] = [
  {
    title: "Todo",
    icon: <Dumbbell />,
    link: "/",
  },
  {
    title: "Calendar",
    icon: <Calendar />,
    link: "/calendar",
  },
  {
    title: "List",
    icon: <List />,
    link: "list",
  },
];

const AppSideBar = () => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const isOpen = useSelector<ReduxState, boolean>(
    (state) => state.app.isSideBarOpen,
  );

  const dispatch = useDispatch();
  const size = useResize({ el: window });

  const usingDrawer = size.width < 768;

  const handleCloseDrawer = useCallback(() => {
    dispatch(closeSideBar());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        handleCloseDrawer();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseDrawer]);

  if (!isOpen) return null;

  const getContent = () => {
    return (
      <>
        {NAV_CONTENT.map((content, index) => (
          <div key={index} className="pt-2">
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
        ))}
      </>
    );
  };

  return usingDrawer ? (
    <>
      <div className="absolute w-full h-full z-10 bg-zinc-500/30 backdrop-blur-[1px]" />
      <div
        className="absolute container pt-12 bg-white w-72 h-full mx-0 opacity-100 z-20"
        ref={drawerRef}
      >
        <div className="pb-5">
          <div className="w-6 h-6 cursor-pointer">
            <Menu onClick={handleCloseDrawer} />
          </div>
        </div>
        {getContent()}
      </div>
    </>
  ) : (
    <div className="container pt-12 bg-white w-72 h-full mx-0 z-20">
      <div className="pb-5">
        <div className="w-6 h-6 cursor-pointer">
          <Menu onClick={handleCloseDrawer} />
        </div>
      </div>
      {getContent()}
    </div>
  );
};

export default AppSideBar;

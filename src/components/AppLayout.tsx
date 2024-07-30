import { FC } from "react";
import AppHeader from "./AppHeader";
import dynamic from "next/dynamic";

type AppLayoutProps = {
  children: JSX.Element;
};

const AppSideBar = dynamic(() => import("./AppSideBar"), { ssr: false });

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <AppHeader />
      <div className="md:flex w-full h-full relative">
        <AppSideBar />
        <div className="w-full h-full pt-12 p-8 relative">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

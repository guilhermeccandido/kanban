import { FC } from "react";
import AppHeader from "./AppHeader";
import AppSideBar from "./AppSideBar";

type AppLayoutProps = {
  children: JSX.Element;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <AppHeader />
      <div className="md:flex w-full h-full">
        <AppSideBar />
        <div className="w-full h-full pt-12 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

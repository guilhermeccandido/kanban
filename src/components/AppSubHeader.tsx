import { FC } from "react";
import SideNavOpener from "./SideNavOpener";
import { HomeIcon } from "lucide-react";
import HeaderTaskCreator from "./HeaderTaskCreator";

type AppSubHeaderProps = {
  title: string;
  link: string;
};

const AppSubHeader: FC<AppSubHeaderProps> = ({ title, link }) => {
  return (
    <div className="flex items-center pb-4 justify-between flex-none">
      <div className="flex">
        <SideNavOpener pageIcon={<HomeIcon />} />
        <div className="pl-3 text-base">{title}</div>
      </div>
      <HeaderTaskCreator caller={link} />
    </div>
  );
};

export default AppSubHeader;

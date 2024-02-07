import SideNavOpener from "@/components/SideNavOpener";
import { HomeIcon } from "lucide-react";
import dynamic from "next/dynamic";

const Tasks = dynamic(() => import("@/components/Home/Tasks"), { ssr: false });

const Home = async () => {
  return (
    <div className="h-full">
      <div className="flex items-center pb-8 justify-between">
        <div className="flex">
          <SideNavOpener pageIcon={<HomeIcon />} />
          <div className="pl-3 text-base">Todo</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

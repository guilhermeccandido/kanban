import Link from "next/link";
import { Button } from "./ui/button";

const AppHeader = () => {
  const isLogin = false;

  return (
    <div className="h-fit bg-secondary border-zinc-50 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2 text-zinc-200">
        <Link href="/" className="flex gap-2 items-center">
          <p className="text-sm">Non Simple Todo</p>
        </Link>

        {isLogin ? null : <Button>Sign In</Button>}
      </div>
    </div>
  );
};

export default AppHeader;

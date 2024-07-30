import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { getAuthSession } from "@/lib/nextAuthOptions";
import UserAvatar from "./UserAvatar";
import UserAccountNav from "./UserAccountNav";

const AppHeader = async () => {
  const session = await getAuthSession();

  return (
    <div className="h-fit bg-secondary border-zinc-50 z-[10] py-2">
      <div className="container h-full mx-auto flex items-center justify-between gap-2 text-zinc-200 max-w-none">
        <Link href="/" className="flex gap-2 items-center">
          <p className="text-xl">KTodo</p>
        </Link>

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link className={buttonVariants()} href={"/login"}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default AppHeader;

import prisma from "@/lib/prismadb";
import { Session } from "next-auth";

export const todoFetchRequest = async (session: Session | null) => {
  if (!session?.user) {
    return [];
  }

  const todos = await prisma.todo.findMany({
    where: {
      ownerId: session.user.id,
      isDeleted: false,
    },
    orderBy: {
      order: "asc",
    },
  });

  return todos;
};

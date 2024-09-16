import prisma from "@/lib/prismadb";
import { Session } from "next-auth";

export const todoFetchRequest = async (
  session: Session | null,
) => {
  if (!session?.user) {
    return [];
  }

  const todos = await prisma.todo.findMany({
    where: {
      ownerId: session.user.id,
    },
    select: {
      id: true,
      title: true,
      state: true,
      deadline: true,
      description: true,
      order: true,
      label: true,
      isDeleted: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return todos;
};

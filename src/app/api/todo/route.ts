import { getAuthSession } from "@/lib/nextAuthOptions";
import { getLogger } from "@/logger";
import prisma from "@/lib/prismadb";

export async function GET(req) {
  const logger = getLogger("info");
  try {
    const session = await getAuthSession();

    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const todos = await prisma.todo.findMany({
      where: {
        ownerId: session.user.id,
        isDeleted: false,
      },
      orderBy: {
        order: "asc",
      },
    });

    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    logger.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

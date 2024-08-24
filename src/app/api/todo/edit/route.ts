import { getAuthSession } from "@/lib/nextAuthOptions";
import { TodoEditValidator } from "@/lib/validators/todo";
import { getLogger } from "@/logger";
import prisma from "@/lib/prismadb";

export async function PATCH(req) {
  const logger = getLogger("info");
  try {
    const session = await getAuthSession();

    if (!session || !session?.user)
      return new Response("Unauthorized", { status: 401 });

    const body = await req.json();

    const {
      id,
      title,
      description,
      deadline,
      dangerPeriod = 0,
      label,
      order,
      state,
    } = TodoEditValidator.parse(body);

    const [record] = await prisma.todo.findMany({
      where: {
        id,
        ownerId: session!.user!.id,
        isDeleted: false,
      },
    });
    if (!record) return new Response("Record Not Found", { status: 404 });

    const isOrderModified =
      typeof order !== "undefined" &&
      (record.order !== order || record.state !== state);
    if (!isOrderModified) {
      await prisma.todo.update({
        where: { id },
        data: {
          title,
          description,
          state,
          deadline,
          dangerPeriod,
          label,
        },
      });

      return new Response("OK", { status: 200 });
    }

    const changedState = record.state !== state;
    if (changedState) {
      await prisma.todo.updateMany({
        where: {
          ownerId: session!.user!.id,
          state: record.state,
          order: { gt: record.order },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      });

      await prisma.todo.updateMany({
        where: {
          ownerId: session!.user!.id,
          state,
          order: { gte: order },
        },
        data: {
          order: {
            increment: 1,
          },
        },
      });

      await prisma.todo.update({
        where: { id },
        data: {
          title,
          description,
          state,
          deadline,
          dangerPeriod,
          label,
          order,
        },
      });

      return new Response("OK", { status: 200 });
    }

    const isOrderIncreased = record.order < order;
    if (isOrderIncreased) {
      await prisma.todo.updateMany({
        where: {
          ownerId: session!.user!.id,
          state,
          order: { gt: record.order, lte: order },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      });

      await prisma.todo.update({
        where: { id },
        data: {
          title,
          description,
          state,
          deadline,
          dangerPeriod,
          label,
          order,
        },
      });

      return new Response("OK", { status: 200 });
    }

    await prisma.todo.updateMany({
      where: {
        ownerId: session!.user!.id,
        state,
        order: { lt: record.order, gte: order },
      },
      data: {
        order: {
          increment: 1,
        },
      },
    });

    await prisma.todo.update({
      where: { id },
      data: {
        title,
        description,
        state,
        deadline,
        dangerPeriod,
        label,
        order,
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    logger.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

import dbConnect from "@/lib/db";
import debug from "@/lib/debug";
import { getAuthSession } from "@/lib/nextAuthOptions";
import { TodoEditValidator } from "@/lib/validators/todo";
import TodoModel from "@/model/Todo";

export async function PATCH(req) {
  try {
    const session = await getAuthSession();

    if (!session || !session?.user)
      return new Response("Unauthorized", { status: 401 });

    const body = await req.json();

    const { id, title, description, state, dueDate, plannedFinishDate, order } =
      TodoEditValidator.parse(body);

    await dbConnect();
    const [record] = await TodoModel.find({
      _id: id,
      Owner: session!.user!.id,
    });
    if (!record) return new Response("Record Not Found", { status: 404 });

    if (typeof order === 'undefined' || record.order === order) {
      await TodoModel.updateOne(
        { _id: id, Owner: session!.user!.id },
        {
          title,
          description,
          state,
          dueDate,
          plannedFinishDate,
        },
      );

      return new Response("OK", { status: 200 });
    }

    const changedState = record.state !== state;
    if (changedState) {
      await TodoModel.updateMany(
        {
          Owner: session!.user!.id,
          state: record.state,
          order: { $gt: record.order },
        },
        { $inc: { order: -1 } },
      );

      await TodoModel.updateMany(
        {
          Owner: session!.user!.id,
          state,
          order: { $gte: order },
        },
        { $inc: { order: 1 } },
      );

      await TodoModel.updateOne(
        { _id: id, Owner: session!.user!.id },
        {
          title,
          description,
          state,
          dueDate,
          plannedFinishDate,
          order,
        },
      );

      return new Response("OK", { status: 200 });
    }

    const isOrderIncreased = record.order < order;
    if (isOrderIncreased) {
      await TodoModel.updateMany(
        {
          Owner: session!.user!.id,
          state,
          order: { $gt: record.order, $lte: order },
        },
        { $inc: { order: -1 } },
      );

      await TodoModel.updateOne(
        { _id: id, Owner: session!.user!.id },
        {
          title,
          description,
          state,
          dueDate,
          plannedFinishDate,
          order,
        },
      );

      return new Response("OK", { status: 200 });
    }

    await TodoModel.updateMany(
      {
        Owner: session!.user!.id,
        state,
        order: { $lt: record.order, $gte: order },
      },
      { $inc: { order: 1 } },
    );

    await TodoModel.updateOne(
      { _id: id, Owner: session!.user!.id },
      {
        title,
        description,
        state,
        dueDate,
        plannedFinishDate,
        order,
      },
    );

    return new Response("OK", { status: 200 });
  } catch (error) {
    debug("src/app/api/todo/edit/route.ts", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

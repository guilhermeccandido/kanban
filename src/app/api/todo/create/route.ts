import dbConnect from "@/lib/db";
import debug from "@/lib/debug";
import { getAuthSession } from "@/lib/nextAuthOptions";
import { TodoCreateValidator } from "@/lib/validators/todo";
import TodoModel from "@/model/Todo";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();

    const {
      title,
      description = "",
      state,
      dueDate,
      plannedFinishDate,
    } = TodoCreateValidator.parse(body);

    await dbConnect();

    const newTodo = {
      title,
      description,
      state,
      dueDate,
      plannedFinishDate,
      Owner: session.user.id,
      isDeleted: false,
    };

    const todoWithMaxOrderInSameState = await TodoModel.find({
      Owner: session.user.id,
      state,
      isDeleted: false,
    })
      .sort({ order: -1 })
      .limit(1)
      .exec();
    const order =
      todoWithMaxOrderInSameState.length === 0
        ? 1
        : todoWithMaxOrderInSameState[0].order + 1;

    await TodoModel.create({
      ...newTodo,
      order,
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    debug("src/app/api/todo/create/route.ts", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

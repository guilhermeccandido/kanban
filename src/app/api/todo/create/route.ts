import dbConnect from "@/lib/db";
import debug from "@/lib/debug";
import { getAuthSession } from "@/lib/nextauthOptions";
import { TodoCreateValidator } from "@/lib/validators/todo";
import TodoModel from "@/model/Todo";
import dayjs from "dayjs";

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

    const newTodo = {
      title,
      description,
      state,
      dueDate,
      plannedFinishDate,
      Owner: session.user.id,
    };

    await dbConnect();
    await TodoModel.create(newTodo);
    return new Response("OK", { status: 200 });
  } catch (error) {
    debug("src/app/api/todo/create/route.ts", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

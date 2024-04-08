import dbConnect from "@/lib/db";
import debug from "@/lib/debug";
import { getAuthSession } from "@/lib/nextauthOptions";
import { TodoEditValidator } from "@/lib/validators/todo";
import TodoModel from "@/model/Todo";

export async function PATCH(req) {
    try {
        const session = await getAuthSession();

        if (!session || !session?.user) return new Response('Unauthorized', { status: 401 });

        const body = await req.json();

        const { id, title, description, state, dueDate, plannedFinishDate } = TodoEditValidator.parse(body);

        await dbConnect();
        const [record] = await TodoModel.find({ _id: id, Owner: session!.user!.id });
        if (!record) return new Response('Record Not Found', { status: 404 });

        await TodoModel.updateOne({ _id: id, Owner: session!.user!.id }, {
            title,
            description,
            state,
            dueDate,
            plannedFinishDate
        });

        return new Response('OK', { status: 200 });
    } catch (error) {
        debug('src/app/api/todo/edit/route.ts', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

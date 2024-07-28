import dbConnect from '@/lib/db';
import debug from '@/lib/debug';
import { getAuthSession } from '@/lib/nextAuthOptions';
import { TodoDeleteValidator } from '@/lib/validators/todo';
import TodoModel from '@/model/Todo';

export async function DELETE(req) {
	try {
		const session = await getAuthSession();

		if (!session?.user) return new Response('Unauthorized', { status: 401 });

		const body = await req.json();

		const { id } = TodoDeleteValidator.parse(body);

		await dbConnect();
		const [record] = await TodoModel.find({
			_id: id,
			Owner: session.user.id,
			isDeleted: false,
		});
		if (!record) return new Response('Record Not Found', { status: 404 });

		await TodoModel.updateOne(
			{ _id: id, Owner: session.user.id },
			{
				isDeleted: true,
			}
		);

		return new Response('OK', { status: 200 });
	} catch (error) {
		debug('src/app/api/todo/delete/route.ts', error);
		return new Response('Internal Server Error', { status: 500 });
	}
}

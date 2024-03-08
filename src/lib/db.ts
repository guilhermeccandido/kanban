import {connect} from 'mongoose';
import debug from './debug';

const dbConnect = async () => {
	try {
		await connect(process.env.MONGODB_URI!, {
			serverSelectionTimeoutMS: 5000,
		});
	} catch (error) {
		debug('src/lib/db.ts', error);
	}
};

export default dbConnect;

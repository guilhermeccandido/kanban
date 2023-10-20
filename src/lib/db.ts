import mongoose from 'mongoose';
import debug from './debug';

const dbConnect = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI!);
	} catch (error) {
		debug('src/lib/db.ts', error);
	}
};

export default dbConnect;

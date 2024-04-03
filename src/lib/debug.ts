const COLORLIST = [
	"\x1b[31m",
	"\x1b[32m",
	"\x1b[33m",
	"\x1b[34m",
	"\x1b[35m",
	"\x1b[36m",
	"\x1b[91m",
	"\x1b[92m",
	"\x1b[93m",
	"\x1b[94m",
	"\x1b[95m",
	"\x1b[96m",
];

const filenameToColor = (filename: string) => {
	const hash = filename
		.split('')
		.reduce((acc, char) => acc + char.charCodeAt(0), 0);
	return COLORLIST[hash % COLORLIST.length];
};

const debug = (filename: string, error: any) => {
	const date = new Date().toUTCString();
	const color = filenameToColor(filename);
	console.debug(`${color}`, `[${date}]: ${filename}`);
	console.debug('\x1b[0m', error);
};

export default debug;

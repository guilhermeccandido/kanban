const debug = (filename: string, error: any) => {
	console.debug('\x1b[33m%s\x1b[0m', `${filename} >>>>>>`);
	console.error(error);
};

export default debug;


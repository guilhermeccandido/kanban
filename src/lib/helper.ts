const debounce = (fn: Function, delay: number) => {
	let timeoutId: NodeJS.Timeout;
	return (...args: any[]) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};

const throttle = (fn: Function, delay: number) => {
    let lastRun = 0;
    return (...args: any[]) => {
        const now = Date.now();
        if (now - lastRun < delay) return;
        lastRun = now;
        return fn(...args);
    };
}

export { debounce, throttle };

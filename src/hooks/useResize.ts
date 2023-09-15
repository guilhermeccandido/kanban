'use client';

import { useEffect, useState } from 'react';

type useReseizeProps = {
	el?: HTMLElement | Window;
};

export interface ElementSize {
	width: number;
	height: number;
}

const useResize = ({ el }: useReseizeProps): ElementSize => {
	const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

	useEffect(() => {
		if (!el) return;

		const handleResize = () => {
			const width = el instanceof Window ? el.innerWidth : el.clientWidth;
			const height = el instanceof Window ? el.innerHeight : el.clientHeight;
			setSize({ width, height });
		};

		handleResize();
		el.addEventListener('resize', handleResize);

		return () => {};
	}, [el]);

	return size;
};

export default useResize;

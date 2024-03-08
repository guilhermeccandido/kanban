import { Children, FC, useEffect, useRef, useState } from 'react';

type ResponsiveCarouselProps = {
	children: React.ReactNode;
	value: number;
    gap?: number;
};

const Carousel: FC<ResponsiveCarouselProps> = ({ children, value, gap }) => {
	const [current, setCurrent] = useState(0);
	const prevValue = useRef(value);

	const numberOfChildren = Children.count(children);

	useEffect(() => {
		if (value === prevValue.current) return;

		const moddedValue = value % numberOfChildren;
		if (moddedValue === prevValue.current) return;

		setCurrent(moddedValue);
		prevValue.current = value;
	}, [value]);

	return (
		<div className='relative h-full'>
			{Children.map(children, (children, index) => {
				return (
					<div
						style={{
							transform: `translateX(${(index - current) * (100 + gap)}%)`,
						}}
						className='h-full w-full top-0 left-0 absolute transition-transform ease-in-out duration-300'
					>
						{children}
					</div>
				);
			})}
		</div>
	);
};

export default Carousel;

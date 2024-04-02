import { Children, FC, useEffect, useRef, useState } from 'react';

type ResponsiveCarouselProps = {
	children: React.ReactNode;
	value: number;
	gap?: number;
	childrenWidth?: number;
};

const Carousel: FC<ResponsiveCarouselProps> = ({
	children,
	value,
	gap,
	childrenWidth = 577,
}) => {
	const [current, setCurrent] = useState(value);
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
		<div
			className='relative h-full w-max flex transition-transform ease-in-out duration-300'
			style={{
				transform: `translateX(${-current * (100 / numberOfChildren)}%)`,
			}}
		>
			{Children.map(children, (children, index) => {
				return (
					<div
						className='h-full top-0 left-0 transition-transform ease-in-out duration-300'
						style={{
							marginRight: gap,
							width: `${childrenWidth}px`,
						}}
					>
						{children}
					</div>
				);
			})}
		</div>
	);
};

export default Carousel;

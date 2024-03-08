import { cn } from '@/lib/utils';
import { FC, useEffect } from 'react';

type CarouselButtonProp = {
	to: (index: number) => void;
	numberOfSlides: number;
	current: number;
};

const CarouselButton: FC<CarouselButtonProp> = ({
	to,
	numberOfSlides,
	current,
}) => {

	return (
		<div className='flex justify-center gap-5 pt-4'>
			{Array.from({ length: numberOfSlides }).map((_, index) => {
				return (
					<button
						key={index}
						onClick={() => to(index)}
						className={cn(
							'shadow-lg w-5 h-5 rounded-md',
							current === index ? 'bg-secondary' : 'bg-white'
						)}
					/>
				);
			})}
		</div>
	);
};

export default CarouselButton;

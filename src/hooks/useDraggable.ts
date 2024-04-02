import { DnDContext, DnDId } from '@/components/DnDContextProvider';
import {
	HtmlHTMLAttributes,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

type UseDraggableArgs = {
	id: DnDId;
	handleClick?: (e: MouseEvent) => void;
	handleDragging?: (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => void;
};

type Attributes = Partial<HtmlHTMLAttributes<HTMLDivElement>>;

type UseDraggableReturn = {
	setNodeRef: (node: HTMLElement | null) => void;
	attributes: Attributes;
	isDragging: boolean;
};

const DRAGGED_THRESHOLD = 5;

const useDraggable = ({
	id,
	handleClick,
	handleDragging,
}: UseDraggableArgs): UseDraggableReturn => {
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [adjustment, setAdjustment] = useState({ x: 0, y: 0 });
	const {
		handleDragStart,
		handleDragging: _handleDragging,
		handleDragEnd,
	} = useContext(DnDContext);
	const isDragged = useRef(false);
	const originalPos = useRef({ x: 0, y: 0 });
	const originalMousePos = useRef({ x: 0, y: 0 });
	const nodeRef = useRef<HTMLElement | null>(null);
	const setup = useRef(false);
	const prevMouseMoveEvent = useRef<MouseEvent | null>(null);

	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		if (isDragging && handleDragging) {
			intervalId = setInterval(() => {
				if (!prevMouseMoveEvent.current) return;
				handleDragging(prevMouseMoveEvent.current);
			}, 100);
		}
		return () => {
			clearInterval(intervalId);
		};
	}, [isDragging, handleDragging]);

	const reset = useCallback(() => {
		setIsDragging(false);
		setPosition({ x: 0, y: 0 });
		setAdjustment({ x: 0, y: 0 });
		isDragged.current = false;
	}, []);

	const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (
		e: React.MouseEvent<HTMLDivElement>
	) => {
		e.preventDefault();
		e.stopPropagation();
		handleDragStart(e, id);
		_handleDragging(e);

		setIsDragging(true);

		const rect = nodeRef.current!.getBoundingClientRect();
		setPosition({ x: e.clientX, y: e.clientY });
		setAdjustment({
			x: e.clientX - rect.x,
			y: e.clientY - rect.y,
		});

		originalMousePos.current = { x: e.clientX, y: e.clientY };

		const originalRect = nodeRef.current?.getBoundingClientRect()!;
		const originalX = originalRect.x;
		const originalY = originalRect.y;
		originalPos.current = { x: originalX, y: originalY };
	};

	const setNodeRef = useCallback((node: HTMLElement | null) => {
		if (setup.current) return;
		setup.current = true;
		if (!node) return;

		nodeRef.current = node;
	}, []);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			e.preventDefault();
			_handleDragging(e);
			setPosition({ x: e.clientX, y: e.clientY });
			prevMouseMoveEvent.current = e;
			if (!isDragged.current) {
				const diffX = Math.abs(e.clientX - originalMousePos.current.x);
				const diffY = Math.abs(e.clientY - originalMousePos.current.y);
				if (diffX > DRAGGED_THRESHOLD || diffY > DRAGGED_THRESHOLD) {
					isDragged.current = true;
				}
			}
		};

		const handleMouseUp = (e: MouseEvent) => {
			e.preventDefault();
			handleDragEnd(e);
			!isDragged.current && handleClick && handleClick(e);
			reset();
		};

		if (isDragging) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);
		} else {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging, handleDragEnd, handleDragging, reset, handleClick]);

	const attributes: Attributes = {
		style: {
			transform: isDragging
				? `translate(${position.x - originalPos.current.x - adjustment.x}px, ${
						position.y - originalPos.current.y - adjustment.y
				  }px)`
				: 'none',
			cursor: isDragging ? 'grabbing' : 'grab',
			position: isDragged.current ? 'absolute' : 'relative',
			zIndex: isDragging ? 2 : 1,
			opacity: isDragging ? 0.5 : 1,
		},
		onMouseDown: onMouseDown,
	};

	return {
		setNodeRef,
		attributes,
		isDragging: isDragging,
	};
};

export default useDraggable;

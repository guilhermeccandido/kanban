import { DnDContext, DnDId } from '@/components/DnDContextProvider';
import {
	HtmlHTMLAttributes,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

type UseDraggableArgs = {
	id: DnDId;
};

type Attributes = Partial<HtmlHTMLAttributes<HTMLDivElement>>;

type UseDraggableReturn = {
	setNodeRef: (node: HTMLElement | null) => void;
	attributes: Attributes;
	isDragging: boolean;
	dragged: boolean;
	setDragged: React.Dispatch<React.SetStateAction<boolean>>;
};

const useDraggable = ({ id }: UseDraggableArgs): UseDraggableReturn => {
	const [isDragging, setIsDragging] = useState(false);
	const [dragged, setDragged] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [adjustment, setAdjustment] = useState({ x: 0, y: 0 });
	const { handleDragStart, handleDragging, handleDragEnd } =
		useContext(DnDContext);
	const originalPos = useRef({ x: 0, y: 0 });
	const nodeRef = useRef<HTMLElement | null>(null);
	const setup = useRef(false);

	const reset = () => {
		setIsDragging(false);
		setPosition({ x: 0, y: 0 });
		setAdjustment({ x: 0, y: 0 });
	};

	const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (
		e: React.MouseEvent<HTMLDivElement>
	) => {
		e.preventDefault();
		e.stopPropagation();
		handleDragStart(e, id);
		handleDragging(e);

		setIsDragging(true);

		const rect = nodeRef.current!.getBoundingClientRect();
		setPosition({ x: e.clientX, y: e.clientY });
		setAdjustment({
			x: e.clientX - rect.x,
			y: e.clientY - rect.y,
		});
	};

	const setNodeRef = (node: HTMLElement | null) => {
		if (setup.current) return;
		setup.current = true;
		if (!node) return;

		nodeRef.current = node;
	};

	useEffect(() => {
		if (!isDragging) {
			const originalRect = nodeRef.current?.getBoundingClientRect();
			const originalX = originalRect?.x || 0;
			const originalY = originalRect?.y || 0;
			originalPos.current = { x: originalX, y: originalY };
		}

		const handleMouseMove = (e: MouseEvent) => {
			e.preventDefault();
			handleDragging(e);
			setPosition({ x: e.clientX, y: e.clientY });
			setDragged(true);
		};

		const handleMouseUp = (e: MouseEvent) => {
			e.preventDefault();
			handleDragEnd(e);
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
	}, [isDragging, handleDragEnd, handleDragging]);

	const attributes: Attributes = {
		style: {
			transform: isDragging
				? `translate(${position.x - originalPos.current.x - adjustment.x }px, ${
						position.y - originalPos.current.y - adjustment.y
				  }px)`
				: 'none',
			cursor: isDragging ? 'grabbing' : 'grab',
			position: isDragging ? 'absolute' : 'relative',
		    zIndex: isDragging ? 2 : 1,
			opacity: isDragging ? 0.5 : 1,
		},
		onMouseDown: onMouseDown,
	};

	return {
		setNodeRef,
		attributes,
		isDragging: isDragging,
		dragged,
		setDragged,
	};
};

export default useDraggable;

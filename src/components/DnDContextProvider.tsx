import useForceUpdate from '@/hooks/useForceUpdate';
import { FC, createContext, useCallback, useEffect, useRef, useState } from 'react';

export type DnDId = string | number;

type OnDragEndEvent = {
	over: DnDId | null;
	from: DnDId | null;
};

type DndContextProps = {
	children: React.ReactNode;
	onDragEnd?: (e: OnDragEndEvent) => void;
	onDragging?: (e: DndMouseEvent) => void;
};

type DroppableMap = {
	[key: DnDId]: {
		node: HTMLElement;
	};
};

type DndMouseEvent = MouseEvent | React.MouseEvent<HTMLDivElement>;

type DndContext = {
	isDragging: boolean;
	isOver: DnDId | null;
	handleDragStart: (e: DndMouseEvent, id: DnDId) => void;
	handleDragging: (e: DndMouseEvent) => void;
	handleDragEnd: (e: DndMouseEvent) => void;
	addDroppable: (id: DnDId, node: HTMLElement) => void;
	removeDroppable: (id: DnDId) => void;
};

const initialState = {
	isDragging: false,
	isOver: null,
	handleDragStart: (e: DndMouseEvent, id: DnDId) => {},
	handleDragging: (e: DndMouseEvent) => {},
	handleDragEnd: (e: DndMouseEvent) => {},
	addDroppable: (id: DnDId, node: HTMLElement) => {},
	removeDroppable: (id: DnDId) => {},
};

export const DnDContext = createContext<DndContext>(initialState);

const DndContextProvider: FC<DndContextProps> = ({ children, onDragEnd, onDragging }) => {
	const [isDragging, setIsDragging] = useState(false);
	const isOver = useRef<DnDId | null>(null);
	const start = useRef<DnDId | null>(null);
	const initialPosition = useRef({ x: 0, y: 0 });
	const currentPosition = useRef({ x: 0, y: 0 });
	const droppableRef = useRef<DroppableMap | null>(null);
	const id = useRef<DnDId | null>(null);
	const prevMouseMoveEvent = useRef<DndMouseEvent | null>(null);
	const forceUpdate = useForceUpdate();

	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		if (isDragging && onDragging) {
			intervalId = setInterval(() => {
				if (!prevMouseMoveEvent.current) return;
				onDragging(prevMouseMoveEvent.current);
			}
			, 100);
		}
		return () => {
			clearInterval(intervalId);
		}
	}, [isDragging, onDragging]);

	const reset = useCallback(() => {
		setIsDragging(false);
		isOver.current = null;
		start.current = null;
		initialPosition.current = { x: 0, y: 0 };
		currentPosition.current = { x: 0, y: 0 };
		id.current = null;
	}, [])

	const addDroppable = (id: DnDId, node: HTMLElement) => {
		droppableRef.current = {
			...droppableRef.current,
			[id]: { node },
		};
	};

	const removeDroppable = (id: DnDId) => {
    if (!droppableRef.current) return;
    delete droppableRef.current[id];
	};

	const handleDragStart = useCallback((e: DndMouseEvent, _id: DnDId) => {
		setIsDragging(true);
		start.current = checkDroppableCollision(e);
		initialPosition.current = { x: e.clientX, y: e.clientY };
		currentPosition.current = { x: e.clientX, y: e.clientY };
		id.current = _id;
	}, [])

	const handleDragging = useCallback((e: DndMouseEvent) => {
		prevMouseMoveEvent.current = e;
		currentPosition.current = { x: e.clientX, y: e.clientY };
		const over = checkDroppableCollision(e);
		if (over !== isOver.current) {
			isOver.current = over;
			forceUpdate();
		}
	}, [])

	const checkDroppableCollision = (e: DndMouseEvent) => {
		let maxId: DnDId | null = null;
		for (const id in droppableRef.current) {
			const { node } = droppableRef.current[id];
			const rect = node.getBoundingClientRect();
			if (
				e.clientX >= rect.left &&
				e.clientX <= rect.right &&
				e.clientY >= rect.top &&
				e.clientY <= rect.bottom
			) {
				maxId = id;
			}
		}
		return maxId;
	};

	const handleDragEnd = useCallback((e: DndMouseEvent) => {
		if (!onDragEnd) return;

		const result = {
			over: isOver.current,
			from: start.current,
			item: id.current,
		};

		onDragEnd(result);
		reset();
	}, [onDragEnd, reset]);

	const value = {
		isDragging,
		isOver: isOver.current,
		handleDragStart,
		handleDragging,
		handleDragEnd,
		addDroppable,
		removeDroppable,
	};

	useEffect(() => {
		// window.addEventListener('mousemove', (e) => console.log(e.clientX, e.clientY));
	}, []);

	return (
		<DnDContext.Provider value={value}>
			{children}
		</DnDContext.Provider>
	);
};

export default DndContextProvider;

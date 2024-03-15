import { DnDContext, DnDId } from '@/components/DnDContextProvider';
import { useContext, useMemo, useRef } from 'react';

type UseDroppableArgs = {
	id: DnDId;
};

type UseDroppableReturn = {
	setNodeRef: (node: HTMLElement | null) => void;
	isOver: boolean;
};

const useDroppable = ({ id }: UseDroppableArgs): UseDroppableReturn => {
	const setup = useRef(false);
	const { addDroppable, isOver: OverObj } = useContext(DnDContext);
	const isOver = useMemo(() => !!OverObj && OverObj == id, [id, OverObj]);

	const setNodeRef = (node: HTMLElement | null) => {
		if (setup.current) return;
		setup.current = true;
		if (!node) return;

		addDroppable(id, node);
	};

	return { setNodeRef, isOver };
};

export default useDroppable;

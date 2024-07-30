import { DnDContext, DnDId } from "@/components/DnDContextProvider";
import {
  HtmlHTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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
  const clonedNode = useRef<HTMLElement | null>(null);

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
    setAdjustment({ x: 0, y: 0 });
    isDragged.current = false;
    document.body.removeChild(clonedNode.current!);
  }, []);

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    handleDragStart(e, id);
    _handleDragging(e);

    setIsDragging(true);

    const rect = nodeRef.current!.getBoundingClientRect();
    setAdjustment({
      x: e.clientX - rect.x,
      y: e.clientY - rect.y,
    });

    originalMousePos.current = { x: e.clientX, y: e.clientY };

    const originalRect = nodeRef.current?.getBoundingClientRect()!;
    const originalX = originalRect.x;
    const originalY = originalRect.y;
    originalPos.current = { x: originalX, y: originalY };

    clonedNode.current = nodeRef.current?.cloneNode(true) as HTMLElement;
    document.body.appendChild(clonedNode.current);
    initialClonedNode(
      clonedNode.current,
      originalX,
      originalY,
      originalRect.width,
      originalRect.height,
    );
  };

  const initialClonedNode = useCallback(
    (
      clonedNode: HTMLElement,
      originalX: number,
      originalY: number,
      width: number,
      height: number,
    ) => {
      clonedNode.style.position = "absolute";
      clonedNode.style.top = `${originalY}px`;
      clonedNode.style.left = `${originalX}px`;
      clonedNode.style.width = `${width}px`;
      clonedNode.style.height = `${height}px`;
    },
    [],
  );

  const moveClonedNode = useCallback(
    (clonedNode: HTMLElement, x: number, y: number) => {
      clonedNode.style.transform = `translate(${x}px, ${y}px)`;
    },
    [],
  );

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
      moveClonedNode(
        clonedNode.current!,
        e.clientX - adjustment.x - originalPos.current.x,
        e.clientY - adjustment.y - originalPos.current.y,
      );
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
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    handleDragEnd,
    handleDragging,
    reset,
    handleClick,
    moveClonedNode,
    adjustment.x,
    adjustment.y,
  ]);

  const attributes: Attributes = {
    onMouseDown: onMouseDown,
    style: {
      outline: isDragging ? "2px solid hsl(var(--secondary))" : "none",
      display: isDragging ? "none" : "block",
      position: "relative",
    },
  };

  return {
    setNodeRef,
    attributes,
    isDragging: isDragging,
  };
};

export default useDraggable;

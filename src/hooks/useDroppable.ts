import { DnDContext, DnDId } from "@/components/DnDContextProvider";
import { useCallback, useContext, useEffect, useMemo, useRef } from "react";

type UseDroppableArgs = {
  id: DnDId;
};

type UseDroppableReturn = {
  setNodeRef: (node: HTMLElement | null) => void;
  isOver: boolean;
  order: number | null;
};

const useDroppable = ({ id }: UseDroppableArgs): UseDroppableReturn => {
  const setup = useRef(false);
  const droppableRef = useRef<HTMLElement | null>(null);
  const { addDroppable, isOver: OverObj, order } = useContext(DnDContext);
  const isOver = useMemo(() => !!OverObj && OverObj == id, [id, OverObj]);

  const hoverElementForChildrenElementTop = useMemo(() => {
    const element = document.createElement("div");
    element.id = `hover-${id}`;
    element.style.height = "2px";
    element.style.width = "100%";
    element.style.backgroundColor = "hsl(var(--primary))";
    element.style.position = "absolute";
    element.style.top = "-1px";
    return element;
  }, [id]);

  const hoverElementForChildrenElementBottom = useMemo(() => {
    const element = document.createElement("div");
    element.id = `hover-${id}`;
    element.style.height = "2px";
    element.style.width = "100%";
    element.style.backgroundColor = "hsl(var(--primary))";
    element.style.position = "absolute";
    element.style.bottom = "-1px";
    return element;
  }, [id]);

  const hoverElementForParentElement = useMemo(() => {
    const element = document.createElement("div");
    element.id = `hover-${id}`;
    element.style.height = "2px"
    element.style.backgroundColor = "hsl(var(--primary))";
    return element;
  }, [id]);

  const setNodeRef = useCallback(
    (node: HTMLElement | null) => {
      if (setup.current) return;
      setup.current = true;
      if (!node) return;

      addDroppable(id, node);
      droppableRef.current = node;
    },
    [addDroppable, id],
  );

  const clearHoverElement = useCallback(() => {
    const element = document.getElementById(`hover-${id}`);
    if (element) {
      element.remove();
    }
  }, [id]);

  const addHoverElementToDom = useCallback(
    (parent: Element, type: "top" | "bottom" | "parent") => {
      clearHoverElement();
      if (type === "top") {
        parent.prepend(hoverElementForChildrenElementTop);
      } else if (type === "bottom") {
        parent.append(hoverElementForChildrenElementBottom);
      } else {
        parent.append(hoverElementForParentElement);
      }
    },
    [
      clearHoverElement,
      hoverElementForParentElement,
      hoverElementForChildrenElementTop,
      hoverElementForChildrenElementBottom,
    ],
  );

  useEffect(() => {
    if (order === null || OverObj !== id) {
      clearHoverElement();
      return;
    }
    if (OverObj !== id || !droppableRef.current) return;
    const childrens = Array.from(droppableRef.current?.children).filter(
      (child) =>
        (child as HTMLElement).style.display !== "none" &&
        (child as HTMLElement).id !== `hover-${id}`,
    );
    if (childrens.length === 0) {
      addHoverElementToDom(droppableRef.current, "parent");
    } else if (order >= childrens.length) {
      addHoverElementToDom(childrens[childrens.length - 1], "bottom");
    } else {
      addHoverElementToDom(childrens[order], "top");
    }
  }, [order, OverObj, id, addHoverElementToDom, clearHoverElement]);

  return { setNodeRef, isOver, order };
};

export default useDroppable;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, forwardRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./index.css";

const TYPE = "move";

const MoveCard = forwardRef(({ name, index, id, moveCard }, wrapRef) => {
  const ref = useRef();
  const [{ opacity }, drag] = useDrag({
    type: TYPE,
    item: () => ({ id, name, index }),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  useEffect(() => {
    drag(ref);
    drap(ref);
  }, [ref]);

  const [, drap] = useDrop({
    accept: TYPE,
    item: () => ({}),
    collect: () => ({}),
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;
      const { top, bottom } = ref.current.getBoundingClientRect();
      const halfOfHoverHeight = (bottom - top) / 2;
      const { y } = monitor.getClientOffset();
      const hoverClientY = y - top;

      if (
        (dragIndex < hoverIndex && hoverClientY > halfOfHoverHeight) ||
        (dragIndex > hoverIndex && hoverClientY < halfOfHoverHeight)
      ) {
        moveCard(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  return (
    <div className="moveItem" style={{ opacity }} ref={ref}>
      move-{name}
    </div>
  );
});

export default MoveCard;

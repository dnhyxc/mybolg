import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./index.css";

const TYPE = "moveCard";

const Card = ({ index, name, id, moveCard }) => {
  const cardRef = useRef();

  const [{ opacity }, drag] = useDrag(() => {
    console.log(id, "id");
    return {
      type: TYPE,
      item: () => ({ id, index }),
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    };
  }, [id, index]);

  drag(cardRef);

  const [_, drap] = useDrop(
    () => ({
      accept: TYPE,
      collect: () => ({}),
      hover(item, monitor) {
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) return;
        const { top, bottom } = cardRef.current.getBoundingClientRect();
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
    }),
    [index]
  );

  drap(cardRef);

  return (
    <div ref={cardRef} className="item" style={{ opacity }}>
      {name}
    </div>
  );
};

export default Card;

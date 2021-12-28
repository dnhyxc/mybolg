/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./index.css";

const TYPE = "moveCard";

const CardList = ({ name, index, id, wrapRef, cards, addCard }) => {
  const ref = useRef();

  useEffect(() => {
    drag(ref);
    drap(wrapRef);
  }, [ref, wrapRef]);

  const [{ opacity }, drag] = useDrag({
    type: TYPE,
    item: (item) => {
      return { id, index, name };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
    end: (item, monitor) => {
      // 判断拖动的元素是否拖入到了容器中
      const dragIndex = item.index;
      const hoverIndex = index;
      if (monitor.didDrop()) {
        addCard(item, dragIndex, hoverIndex);
      }
    },
  });

  const [, drap] = useDrop({
    accept: TYPE,
    item: () => ({}),
    collect: () => ({}),
    hover(item, monitor) {},
  });

  return (
    <div className="list-item" style={{ opacity }} ref={ref}>
      add-{name}
    </div>
  );
};

export default CardList;

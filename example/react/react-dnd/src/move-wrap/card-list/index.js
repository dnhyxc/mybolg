/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./index.css";

const TYPE = "addCard";

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
  });

  const [, drap] = useDrop({
    accept: TYPE,
    item: () => ({}),
    collect: () => ({}),
    hover(item, monitor) {
      if (!cards.map((i) => i.id).includes(item.id)) {
        addCard(item);
      }
    },
  });

  return (
    <div className="list-item" style={{ opacity }} ref={ref}>
      add-{name}
    </div>
  );
};

export default CardList;

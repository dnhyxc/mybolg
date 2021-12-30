/*
 * @Description: 用于移动的卡片
 * @Author: dnh
 * @Date: 2021-12-28 18:13:59
 * @LastEditTime: 2021-12-30 10:34:42
 * @LastEditors: dnh
 * @FilePath: \example\react\deep-dnd\src\card\index.jsx
 */
import { useRef, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TYPE } from "../utils";
import "./index.css";

const Card = ({ name, id, index, moveCard }) => {
  const ref = useRef();
  const [{ opacity }, drag, dragPreview] = useDrag({
    type: TYPE,
    item: () => ({ id, index, name }),
    collect: (monitor) => ({ opacity: monitor.isDragging() ? 0.5 : 1 }),
  });

  drag(ref);

  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: TYPE,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? " drop-over-downward" : " drop-over-upward",
      };
    },
    drop: (item) => {
      moveCard(item.index, index);
    },
    // hover(item, monitor) {
    //   const dragIndex = item.index;
    //   const hoverIndex = index;

    //   if (dragIndex === hoverIndex) return;
    //   const { top, bottom } = ref.current.getBoundingClientRect();
    //   const halfOfHoverHeight = (bottom - top) / 2;
    //   const { y } = monitor.getClientOffset();
    //   const hoverClientY = y - top;

    //   if (
    //     (dragIndex < hoverIndex && hoverClientY > halfOfHoverHeight) ||
    //     (dragIndex > hoverIndex && hoverClientY < halfOfHoverHeight)
    //   ) {
    //     moveCard(dragIndex, hoverIndex);
    //     item.index = hoverIndex;
    //   }
    // },
  });

  dragPreview(drop(ref));

  return (
    <div ref={ref} className="card" style={{ opacity }}>
      {name}
    </div>
  );
};

export default Card;

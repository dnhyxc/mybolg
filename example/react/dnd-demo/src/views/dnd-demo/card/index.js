import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./index.css";

const TYPE = "moveCard";

/**
 * useDrag：对应项目的拖动源
 * drag：拖动源的连接器，连接真实dom
 * useDrop：对应项目的放置目标
 */

const Card = ({ data, id, index, moveCard }) => {
  let cardRef = useRef();
  // drag 拖动源的连接器，连接真实dom
  const [{ isDragging }, drag] = useDrag({
    type: TYPE,
    item: () => ({ id, index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const opacity = isDragging ? 0.1 : 1;

  drag(cardRef);

  useDrop({
    // accept：这个放置目标只会对指定类型的额拖动源发生反应，必须与useDrag中的type相对应
    accept: TYPE,
    collect: () => ({}),
    hover(item, monitor) {
      // 获取正在拖动卡片的index
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const { top, bottom } = cardRef.current.getBoundingClientRect();
      const halfOfHoverHeight = (bottom - top) / 2; // hover的卡片高度的一半
      const { y } = monitor.getClientOffset(); // y：相当于 event.clientY，即为鼠标相对于页面左上角的y坐标
      const hoverClientY = y - top; // 获取正在拖动的card相对于hover卡片的纵向位置
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
    <div ref={cardRef} className="cardItem" style={{ opacity }}>
      {data.name}
    </div>
  );
};

export default Card;

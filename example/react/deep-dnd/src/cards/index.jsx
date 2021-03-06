/*
 * @Description: 用于拖入容器的卡片组容器
 * @Author: dnh
 * @Date: 2021-12-28 18:18:52
 * @LastEditTime: 2021-12-31 12:09:19
 * @LastEditors: dnh
 * @FilePath: \example\react\deep-dnd\src\cards\index.jsx
 */
import { useDrag } from "react-dnd";
import { TYPE } from "../utils";
import "./index.css";

const Cards = ({ name, index, currentIndex, id, cardList, changeCards }) => {
  const [{ opacity }, drag] = useDrag({
    type: TYPE,
    item: () => ({ id, index, name }),
    collect: (monitor) => {
      return { opacity: monitor.isDragging() ? 0.5 : 1 };
    },
    end: (item, monitor) => {
      // 判断拖动的元素是否拖入到了容器中
      if (monitor.didDrop()) {
        const cloneCards = [...cardList];
        if (currentIndex !== null) {
          cloneCards.splice(currentIndex + 1, 0, item);
        } else {
          cloneCards.splice(cardList.length, 0, item);
        }
        changeCards([...cloneCards]);
      }
    },
  });

  return (
    <div className="cards-item" style={{ opacity }} ref={drag}>
      {name}
    </div>
  );
};

export default Cards;

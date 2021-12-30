/*
 * @Description: 卡片列表，作为移入card的容器
 * @Author: dnh
 * @Date: 2021-12-28 18:14:57
 * @LastEditTime: 2021-12-30 10:44:56
 * @LastEditors: dnh
 * @FilePath: \example\react\deep-dnd\src\cardList\index.jsx
 */
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { TYPE } from "../utils";
import Card from "../card";
import "./index.css";

const CardList = ({ cardList, changeCards, getCurrentItemIndex }) => {
  const [, drop] = useDrop({
    accept: TYPE,
  });

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cardList[dragIndex];
    dragCard && cardList.splice(dragIndex, 1);
    dragCard && cardList.splice(hoverIndex, 0, dragCard);
    changeCards([...cardList]);
    // const dragRow = cardList[dragIndex];
    // changeCards(
    //   update(cardList, {
    //     $splice: [
    //       [dragIndex, 1],
    //       [hoverIndex, 0, dragRow],
    //     ],
    //   })
    // );
  };

  return (
    <div ref={drop} className="cardList">
      {cardList.length > 0 ? (
        cardList.map((i, index) => (
          <Card
            {...i}
            index={index}
            key={index}
            moveCard={moveCard}
            getCurrentItemIndex={getCurrentItemIndex}
          />
        ))
      ) : (
        <div>请从左边拖入卡片</div>
      )}
    </div>
  );
};

export default CardList;

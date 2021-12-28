/*
 * @Description: 卡片列表，作为移入card的容器
 * @Author: dnh
 * @Date: 2021-12-28 18:14:57
 * @LastEditTime: 2021-12-28 20:27:13
 * @LastEditors: dnh
 * @FilePath: \example\react\deep-dnd\src\cardList\index.jsx
 */
import { useCallback } from "react";
import { useDrop } from "react-dnd";
import { TYPE } from "../utils";
import Card from "../card";
import './index.css'

const CardList = ({ cardList, changeCards }) => {
  const [, drop] = useDrop({
    accept: TYPE,
  });

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      console.log(cardList, "cardList");
      console.log(dragIndex, "dragIndex");
      console.log(hoverIndex, "hoverIndex");

      if (dragIndex === undefined) {
        const findIndex = cardList.findIndex((item) => item.id === -1);
        console.log(findIndex);
        // changeCards();
      } else {
        const dragCard = cardList[dragIndex];
        console.log(dragCard, "dragCard");
        // changeCards();
      }
    },
    [cardList]
  );

  return (
    <div ref={drop} className="cardList">
      {cardList.length > 0 ? (
        cardList.map((i, index) => (
          <Card {...i} index={index} key={i.id} moveCard={moveCard} />
        ))
      ) : (
        <div>请从左边拖入卡片</div>
      )}
    </div>
  );
};

export default CardList;

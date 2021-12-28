import React, { useState } from "react";
import Card from "./card";

const DndWrap = () => {
  const [cardList, setCardList] = useState([
    {
      id: "card1",
      name: "card1",
    },
    {
      id: "card2",
      name: "card2",
    },
    {
      id: "card3",
      name: "card3",
    },
  ]);

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cardList[dragIndex];
    cardList.splice(dragIndex, 1);
    cardList.splice(hoverIndex, 0, dragCard);
    setCardList([...cardList]);
  };

  return (
    <div>
      {cardList.map((i, index) => (
        <Card
          key={i.id}
          id={i.id}
          name={i.name}
          index={index}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};

export default DndWrap;

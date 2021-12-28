import React, { useRef, useState } from "react";
import Card from "./card";
import "./index.css";

const DndDemo = () => {
  const [cardList, setCardList] = useState([
    {
      id: 1,
      name: "card1",
    },
    {
      id: 2,
      name: "card2",
    },
    {
      id: 3,
      name: "card3",
    },
  ]);

  const dndRef = useRef();

  const moveCard = (dragIndex, hoverIndex) => {
    console.log(dragIndex, hoverIndex);
  };

  return (
    <div className="cardWrap" ref={dndRef}>
      {cardList.map((i, index) => (
        <Card data={i} key={i.id} id={i.id} index={index} moveCard={moveCard} />
      ))}
    </div>
  );
};

export default DndDemo;

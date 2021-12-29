/*
 * @Description: dnd 容器
 * @Author: dnh
 * @Date: 2021-12-28 18:00:51
 * @LastEditTime: 2021-12-29 21:02:05
 * @LastEditors: dnh
 * @FilePath: \example\react\deep-dnd\src\container\index.js
 */
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Cards from "../cards";
import CardList from "../cardList";
import "./index.css";
import { useState } from "react";

const cards = [
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
  {
    id: "card4",
    name: "card4",
  },
  {
    id: "card5",
    name: "card5",
  },
];

const Container = () => {
  const [cardList, setCardList] = useState([]);

  const changeCards = (item) => {
    setCardList(item);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <div className="cards">
          {cards.map((i, index) => (
            <Cards
              {...i}
              key={i.id}
              index={index}
              cardList={cardList}
              changeCards={changeCards}
            />
          ))}
        </div>
        <div className="cardList">
          <CardList cardList={cardList} changeCards={changeCards} />
        </div>
      </div>
    </DndProvider>
  );
};

export default Container;

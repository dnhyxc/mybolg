import { useRef, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DndWrap from "./dnd-wrap";
import MoveWrap from "./move-wrap";
import CardList from "./move-wrap/card-list";
import "./App.css";

const cardList = [
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

function App() {
  const [cards, setCards] = useState([]);

  const ref = useRef();

  const addCard = (item) => {
    const cloneCards = [...cards];
    if (!cloneCards.map((i) => i.id).includes(item.id)) {
      cloneCards.push(item);
      setCards(cloneCards);
    }
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cards[dragIndex];
    cards.splice(dragIndex, 1);
    cards.splice(hoverIndex, 0, dragCard);
    setCards([...cards]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <div>
          <div className="title">交换位置</div>
          <DndWrap />
        </div>
        <div className="moveCardList">
          <div className="title">添加card并交换位置</div>
          <div className="card_list">
            <div className="content">
              {cardList.map((i, index) => (
                <CardList
                  wrapRef={ref}
                  key={i.id}
                  index={index}
                  id={i.id}
                  name={i.name}
                  addCard={addCard}
                  cards={cards}
                />
              ))}
            </div>
            <MoveWrap ref={ref} cards={cards} moveCard={moveCard} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;

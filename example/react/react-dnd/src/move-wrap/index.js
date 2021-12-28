import React, { forwardRef } from "react";
import MoveCard from "./move-card";
import "./index.css";

const MoveWrap = forwardRef(({ cards, moveCard }, wrapRef) => {
  return (
    <div className="moveWrap" ref={wrapRef}>
      {cards.length > 0 &&
        cards.map((i, index) => {
          return (
            <MoveCard
              key={i.id}
              id={i.id}
              name={i.name}
              index={index}
              moveCard={moveCard}
            />
          );
        })}
    </div>
  );
});

export default MoveWrap;

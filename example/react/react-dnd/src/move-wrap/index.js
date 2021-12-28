import React, { forwardRef } from "react";
import MoveCard from "./move-card";
import "./index.css";

const MoveWrap = forwardRef(({ cards, moveCard }, wrapRef) => {
  return (
    <div>
      <div className="moveWrap" ref={wrapRef}>
        {cards.length > 0 &&
          cards.map((i, index) => {
            return (
              <MoveCard
                key={index}
                id={i.id}
                name={i.name}
                index={index}
                moveCard={moveCard}
              />
            );
          })}
      </div>
    </div>
  );
});

export default MoveWrap;

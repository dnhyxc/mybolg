import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DndWrap from "./dnd-wrap";
import MoveWrap from "./move-wrap";
import "./App.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <div>
          <DndWrap />
        </div>
        <MoveWrap />
      </div>
    </DndProvider>
  );
}

export default App;

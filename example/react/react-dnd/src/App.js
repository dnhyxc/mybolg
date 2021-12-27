import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DndWrap from "./dnd-wrap";
import "./App.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <DndWrap />
    </DndProvider>
  );
}

export default App;

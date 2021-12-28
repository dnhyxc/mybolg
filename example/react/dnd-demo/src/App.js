import DndDemo from "./views/dnd-demo";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import "./App.css";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DndDemo />
    </DndProvider>
  );
};

export default App;

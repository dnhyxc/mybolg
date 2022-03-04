import OutRoot from "./createPortal";
import CreateElement from "./createElement/index";
import RenderSelf from "./createPortal/renderSelf";
import HowToUseContext from "./useContext";

const App = () => {
  return (
    <div>
      <CreateElement />
      <hr />
      <OutRoot />
      <RenderSelf />
      <hr />
      <HowToUseContext />
      <hr />
    </div>
  );
};

export default App;

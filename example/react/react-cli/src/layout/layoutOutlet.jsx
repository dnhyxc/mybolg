import { Outlet } from "react-router-dom";
import "./index.css";

const LayoutOutlet = () => {
  return (
    <div className="outlet">
      <div className="left">left</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutOutlet;

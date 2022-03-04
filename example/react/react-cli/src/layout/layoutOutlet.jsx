import { Outlet } from "react-router-dom";
import "./index.css";

const LayoutOutlet = () => {
  return (
    <div className="outlet">
      <Outlet />
    </div>
  );
};

export default LayoutOutlet;

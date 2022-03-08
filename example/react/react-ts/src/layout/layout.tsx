import { Outlet } from "react-router-dom";
import MenuList from "../components/MenuList";
import "./index.css";

const AppLayout = () => {
  return (
    <div className="container">
      <div className="left">
        <MenuList />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;

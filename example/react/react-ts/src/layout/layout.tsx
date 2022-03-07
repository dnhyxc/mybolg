import { Outlet } from "react-router-dom";
import './index.css'

const AppLayout = () => {
  return (
    <div className="container">
      <div className="left">left</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout
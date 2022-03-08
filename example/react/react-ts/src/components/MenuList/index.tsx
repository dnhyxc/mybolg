import { useEffect } from "react";
import { Navigate, NavLink } from "react-router-dom";
import "./index.css";

const MenuList: React.FC = () => {
  // useEffect(() => {
  //   if (location.pathname === "/") {

  //   }
  // }, []);
  return (
    <div className="menuList">
      {/* end：该属性可以设置当选中 /home 的子集路由时，
      home 这个菜单不加上 选中状态，只给子级加上选中状态，
      默认是父级和子集同时都会加上选中状态
      <NavLink to="/home" end className="link">*/}
      <NavLink to="/home" className="link">
        首页
      </NavLink>
      <NavLink to="/about" className="link">
        关于
      </NavLink>
    </div>
  );
};

export default MenuList;

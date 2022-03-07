import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import Layout from "../layout/layout";
const Home = lazy(() => import("../view/home"));
const About = lazy(() => import("../view/about"));
const Login = lazy(() => import("../view/login"));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />, // 指定路由渲染容器
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '*',
    element: <Navigate to='/' /> // 路由重定向
  }
];

export default routes;

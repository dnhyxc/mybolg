import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import CreateElement from "../createElement";
import CreatePortal from "../createPortal";
import RenderSelf from "../createPortal/renderSelf";
import UseContext from "../useContext";
import Home from "../view/home";
import About from "../view/about";
import Layout from "../layout";
import LayoutOutlet from "../layout/layoutOutlet";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 相当于Vue中的插槽，会将RouterDOM渲染到Layout组件的指定容器中（即<Outlet/>标记处） */}
          <Route path="/" element={<LayoutOutlet />}>
            {/* 默认加载 RouterDOM*/}
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="create" element={<CreateElement />} />
          <Route path="portal" element={<CreatePortal />} />
          <Route path="renderSelf" element={<RenderSelf />} />
          <Route path="context" element={<UseContext />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

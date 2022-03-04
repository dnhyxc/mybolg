import "./index.css";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <div className="left">left</div>
      {children}
    </div>
  );
};

export default Layout;

import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const toMessage = () => {
    navigate("/home/message", {
      state: {
        from: "我从山中来",
      },
      replace: false, // 默认 replace 是 false
    });
  };

  return (
    <div>
      <div onClick={toMessage}>message</div>
      <Outlet />
    </div>
  );
};

export default Home;

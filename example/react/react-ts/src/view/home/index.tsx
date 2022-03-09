import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const toMessage = () => {
    navigate("message", {
      state: {
        from: "state 传参 => 我从山中来",
      },
      replace: false, // 默认 replace 是 false
    });
  };

  return (
    <div>
      <div onClick={toMessage}>click to message</div>
      <Outlet />
    </div>
  );
};

export default Home;

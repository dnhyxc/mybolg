import { useNavigate, useLocation } from "react-router-dom";

const Message: React.FC = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  const onClickMessage = (index: number) => {
    navigate(`/home/detail?id=${index}`);
  };

  return (
    <div>
      <ul>
        {[0, 1, 2].map((i) => {
          return (
            <li key={i} onClick={() => onClickMessage(i)}>
              {state.from}message{i}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Message;

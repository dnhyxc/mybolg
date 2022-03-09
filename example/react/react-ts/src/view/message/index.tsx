import { useNavigate, useLocation } from "react-router-dom";

interface LocationState {
  from: {
    pathname: string;
  };
}

const Message: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { from } = location.state as LocationState;

  const onClickMessage = (index: number) => {
    navigate(`/home/detail?id=${index}`);
  };

  return (
    <div>
      <ul>
        {[0, 1, 2].map((i) => {
          return (
            <li key={i} onClick={() => onClickMessage(i)}>
              {from}message{i}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Message;

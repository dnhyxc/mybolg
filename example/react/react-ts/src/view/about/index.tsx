import { useNavigate } from "react-router-dom";

const About = () => {
  const navative = useNavigate();

  const toDetail = (id: number) => {
    navative(`detail/${id}`);
  };

  return (
    <div>
      {[100, 111, 222, 333].map((i) => (
        <p key={i} onClick={() => toDetail(i)}>
          {i} click to detail
        </p>
      ))}
    </div>
  );
};

export default About;

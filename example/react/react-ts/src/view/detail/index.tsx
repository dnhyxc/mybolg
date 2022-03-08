import { useSearchParams } from "react-router-dom";

const Detail = () => {
  const [search] = useSearchParams();
  const id = search.get("id");
  console.log(id);
  return <div>Detail</div>;
};

export default Detail;

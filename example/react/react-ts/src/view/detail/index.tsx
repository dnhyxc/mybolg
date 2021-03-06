import { useParams, useSearchParams } from "react-router-dom";

const Detail = () => {
  // 接收query传参
  const [search] = useSearchParams();
  const id = search.get("id");
  const { id: paramsId } = useParams();

  return <div>Detail{id || paramsId}</div>;
};

export default Detail;

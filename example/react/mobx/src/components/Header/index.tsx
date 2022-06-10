import { Button } from "antd";
import styles from "./index.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <Button type="primary">header</Button>
    </div>
  );
};

export default Header;

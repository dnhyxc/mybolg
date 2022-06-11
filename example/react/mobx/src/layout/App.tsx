/*
 * @Description: app
 * @Author: dnh
 * @Date: 2022-06-10 11:52:37
 * @LastEditors: dnh
 * @FilePath: \example\react\mobx\src\layout\App.tsx
 * @LastEditTime: 2022-06-10 18:31:20
 */
import Header from "../components/Header";
import { Button } from "antd";
import styles from  "./App.less";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <div>mobx</div>
      <Button type="primary">自定义主题终于生效了</Button>
    </div>
  );
}

export default App;

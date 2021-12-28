/*
 * @Description: dnd 容器
 * @Author: dnh
 * @Date: 2021-12-28 18:00:51
 * @LastEditTime: 2021-12-28 18:57:03
 * @LastEditors: dnh
 * @FilePath: \example\react\deep-dnd\src\container\index.js
 */
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const Container = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>container</div>
    </DndProvider>
  );
};

export default Container;

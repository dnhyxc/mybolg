import { useRoutes } from "react-router-dom";
import routeConfig from './config'

const RouterConfig = () => {
  return useRoutes(routeConfig)
};

export default RouterConfig;
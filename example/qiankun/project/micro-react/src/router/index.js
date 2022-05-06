import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect,
} from "react-router-dom";
import App from "../App";
import Home from "../views/Home";
import About from "../views/About";

import "./index.css";

const RouterConfig = ({ info, routerBase }) => {
  return (
    <div className="App">
      <App>
        <Router basename={routerBase}>
          <div className="menu">
            <NavLink to="/" exact className="link">
              to Home
            </NavLink>
            <NavLink to="/about" className="link">
              to About
            </NavLink>
          </div>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <Home info={info} />;
              }}
            ></Route>
            <Route path="/about" component={About}></Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </App>
    </div>
  );
};

export default RouterConfig;

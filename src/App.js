import React, { useEffect, useReducer } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LoginPages from "./components/wwPages/LoginPages/LoginPages";
import FilmsPages from "./components/wwPages/FilmsPages/FilmsPages";
import AddFilm from "./components/wwPages/AddFilmPage/AddFilmPage";
import PermissionComponent from "./components/PersmissionComponent/PermissionComponent";
import Context from "./auth-context";

import { appReducer } from "./reducer";

export const App = props => {
  const [state, dispatch] = useReducer(appReducer, { isAuth: false });

  useEffect(() => {
    checkAuth();
  });

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch({ type: "logoutHandler" });
    } else {
      dispatch({ type: "loginHandler" });
    }
  };
  return (
    <Context.Provider value={dispatch}>
      <Switch>
        {state.isAuth ? (
          <Redirect from="/login" to="/films" />
        ) : (
          <Route path="/login" exec component={LoginPages} />
        )}
        <PermissionComponent auth={state.isAuth}>
          <Route path="/films" exec component={FilmsPages} />
          <Route path="/addfilm" exec component={AddFilm} />
        </PermissionComponent>
        <Redirect from="/" to="/login" />
      </Switch>
    </Context.Provider>
  );
};

export default App;

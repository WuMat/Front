import React, { lazy, Suspense, useEffect, useReducer } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Context from "./auth-context";
import { appReducer } from "./reducer";
import PermissionComponent from "./components/PersmissionComponent/PermissionComponent";

const LoginPages = lazy(() =>
  import("./components/wwPages/LoginPages/LoginPages")
);
const FilmsPages = lazy(() =>
  import("./components/wwPages/FilmsPages/FilmsPages")
);
const AddFilm = lazy(() =>
  import("./components/wwPages/AddFilmPage/AddFilmPage")
);

const App = props => {
  const [state, dispatch] = useReducer(appReducer, { isAuth: false });

  useEffect(() => {
    dispatch({ type: "checkLogin" });
  }, []);

  return (
    <Context.Provider value={dispatch}>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </Context.Provider>
  );
};

export default App;

Route.propTypes.component = PropTypes.oneOfType([
  Route.propTypes.component,
  PropTypes.object
]);

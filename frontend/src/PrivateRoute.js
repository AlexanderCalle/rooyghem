import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./middleware/auth";

function PrivateRoute({ component: Component, ...rest }) {

    // const authTokens = Auth.isValidToken();

  return (
    <Route
      {...rest}
      render={props =>
        Auth.isValidToken()
        ? (
          <Component {...props} />
        ) : (
          <Redirect to="/users/login" />
        )
      }
    />
  );
}

export default PrivateRoute;
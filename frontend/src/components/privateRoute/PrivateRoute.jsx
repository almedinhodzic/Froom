import React from "react";

// redux
import { useSelector } from "react-redux";
// Router
import { Route, Redirect } from "react-router-dom";

// This is user for private Routing. If user is not authenticated, he can access only routes that are public, if he is authenticated, he has access to every route on forum.
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;

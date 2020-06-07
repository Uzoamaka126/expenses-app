import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "./useLocalStorage";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const token = getToken();
  return (
    <Route
      {...props}
      render={(props) => {
        if (token) {
          return <Component {...props} />;
        } else {
          // Push the target route to local storage, to be accessed upon successful auth
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;

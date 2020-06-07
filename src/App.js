import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Route, Switch, Redirect } from "react-router-dom";
import { customTheme } from "./Components/Styles/GlobalTheme";
import Login from "./Components/PublicApp/Login/Login";
import Signup from "./Components/PublicApp/Signup/Signup";
import ProtectedApp from "./Components/ProtectedApp";
import { NotFound } from "./Components/ErrorPage";

function App(props) {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/login" />;
          }}
        />
        <Route
          path="/login"
          render={(props) => <Login {...props} />}
        />
        <Route
          path="/signup"
          render={(props) => <Signup {...props} />}
        />
        {/* This should be enclosed in a protected route */}
        <Route
          path="/dashboard"
          render={(props) => <ProtectedApp {...props} />}
        />
        <Route
          component={NotFound}
        />
      </Switch>
    </ThemeProvider>
  );
}

export default App;

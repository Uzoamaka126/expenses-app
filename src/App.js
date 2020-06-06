import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Route, Switch } from "react-router-dom";
import { customTheme } from "./Components/Styles/GlobalTheme";
import Login from "./Components/PublicApp/Login/Login";
import Signup from "./Components/PublicApp/Signup/Signup";
import ProtectedApp from "./Components/ProtectedApp";

function App(props) {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Switch>
        <Route
          path="/login"
          render={(props) => <Login {...props} />}
        />
        <Route
          path="/signup"
          render={(props) => <Signup {...props} />}
        />
        <Route
          path="/dashboard"
          render={(props) => <ProtectedApp {...props} />}
        />
      </Switch>
    </ThemeProvider>
  );
}

export default App;

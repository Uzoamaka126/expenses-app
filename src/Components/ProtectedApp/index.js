import * as React from "react";
import { Switch } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Onboarding } from "./Onboarding";
import ProtectedRoute from "../../Utilities/ProtectedRoute";
import { FirebaseContext } from "../../Utilities/Firebase";
export default function ProtectedApp(props) {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <Dashboard firebase={firebase} {...props}>
          <Switch>
            {/* <ProtectedRoute
            path="/s/home"
            isLoggedIn={!!user}
            render={(props) => <Home {...props} />}
          />
          <ProtectedRoute
            path="/s/onboarding"
            isLoggedIn={!!user}
            render={(props) => <Onboarding {...{ user, profile, ...props }} />}
          />
          */}
            <ProtectedRoute
              path="/dashboard/onboarding"
              render={(props) => <Onboarding {...props} />}
            />
          </Switch>
        </Dashboard>
      )}
    </FirebaseContext.Consumer>
  );
}

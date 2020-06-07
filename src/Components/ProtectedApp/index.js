import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Onboarding } from "./Onboarding";
import ProtectedRoute from "../../Utilities/ProtectedRoute";
import { FirebaseContext } from "../../Utilities/Firebase";
import { NotFound } from "../ErrorPage";
export default function ProtectedApp(props) {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <Dashboard firebase={firebase} {...props}>
          <Switch>
            <ProtectedRoute
              path="/dashboard/onboarding"
              // render={(props) => <Onboarding {...props} />}
              component={Onboarding}
            />
            <Route
              component={NotFound}
            />
          </Switch>
        </Dashboard>
      )}
    </FirebaseContext.Consumer>
  );
}

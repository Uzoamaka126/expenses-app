import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Onboarding } from "./Onboarding";
import ProtectedRoute from "../../Utilities/ProtectedRoute";
import { FirebaseContext } from "../../Utilities/Firebase";
import { ExpensesContextProvider } from "./Expenses";
import { NotFound } from "../UI";
export default function ProtectedApp(props) {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
      <Dashboard {...props}>
        <Switch>
          <ProtectedRoute
            path="/dashboard/onboarding"
            component={Onboarding}
          />
          <ProtectedRoute
            path="/dashboard/expenses"
            component={ExpensesContextProvider}
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

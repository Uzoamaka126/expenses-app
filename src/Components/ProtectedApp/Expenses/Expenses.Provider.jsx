import React from 'react';
import { ExpensesConsumer } from './Expenses.Consumer';
import { FirebaseContext } from "../../../Utilities/Firebase";

// export const ExpensesContext = React.createContext(null);

// const dummyObj = {
//   id: 1,
//   name: "Amaka",
//   expenses: [],
// };

// Create a bunch of functions and put them all in an object that can be passed to the value prop
export function ExpensesContextProvider(props) {
  const { history } = props;
    return (
      <FirebaseContext.Consumer>
        {(firebase) => (
          <ExpensesConsumer firebase={firebase} history={history} {...props} />
          //   {children}
          // </ExpensesConsumer>
        )}
      </FirebaseContext.Consumer>
    )
}
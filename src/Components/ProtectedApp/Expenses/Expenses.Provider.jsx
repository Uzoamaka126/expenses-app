import React from 'react';
import { ExpensesConsumer } from './Expenses.Consumer';

export const ExpensesContext = React.createContext(null);

const dummyObj = {
  id: 1,
  name: "Amaka",
  expenses: [
    // {
    //   id: 1,
    //   name: "Amaka",
    // },
    // {
    //   id: 1,
    //   name: "Amaka",
    // },
    // {
    //   id: 1,
    //   name: "Amaka",
    // },
  ],
};

// Create a bunch of functions and put them all in an object that can be passed to the value prop
export function ExpensesContextProvider({ children }) {
    return (
        <ExpensesContext.Provider value={dummyObj}>
            <ExpensesConsumer>
                {children}
            </ExpensesConsumer>
        </ExpensesContext.Provider>
    )
}
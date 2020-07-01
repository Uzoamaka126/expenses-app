import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Box, Button, useDisclosure, useToast } from "@chakra-ui/core";
import { ExpensesTable } from "./index";
import { EmptyPage, PageHeader } from "../../index";
import EmptyImage from "../../../assets/empty_page_2.svg";
import { TableDropdown } from "./components/TableDropdown";
import { TableRender } from "./Expenses.Table";
import { getState } from "../../../Utilities/useLocalStorage";
import { ToastBox } from "../../ToastBox";
import { FullPageSpinner } from "../../FullPageSpinner";
export function ExpensesConsumer({ firebase, history }) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [expensesData, setExpensesData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [add, setAdd] = useState({});

  const { uid } = getState();
  const toast = useToast();

  useEffect(() => {
    if (uid) {
      handleFetchExpenses(uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  console.log(expensesData);

  function handleDeleteExpense(id) {
    setIsDeleteLoading(true);
    firebase
      .doDeleteUserExpense(id)
      .then(() => {
        if (expensesData) {
          const updatedArray = expensesData.filter((item) => item.id !== id);
          setExpensesData(updatedArray);
        }
        setIsDeleteLoading(false);
        handleFetchExpenses(uid)
        toast({
          position: "bottom-left",
          render: () => <ToastBox message="Expense deleted" />,
        });
        onClose();
      })
      .catch((error) => {
        setIsDeleteLoading(false);
        toast({
          position: "bottom-left",
          render: () => <ToastBox message={error} />,
        });
        onClose();
      });
  }

  function handleFetchExpenses(userId) {
    setFetchLoading(true);
    firebase
      .doGetUserExpenses(userId)
      .then((result) => {
        setExpensesData(
          result.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        setFetchLoading(false);
      })
      .catch((error) => {
        setFetchLoading(false);
        console.log(error);
      });
  }

  function handleAddExpense(data) {
    setIsLoading(true);
    firebase
      .doAddUserExpense(data)
      .then((result) => {
        setAdd(result);
        console.log(add);
        setIsLoading(false);
        onClose();
        handleFetchExpenses(uid);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "expenses_name",
      },
      {
        Header: "Amount",
        accessor: "amount ",
        Cell: ({ row: { original } }) => (
          <>{original.amount ? original.amount : "-"}</>
        ),
      },
      {
        Header: "Category",
        accessor: "category_name ",
        Cell: ({ row: { original } }) => (
          <>{original.category_name ? original.category_name : "-"}</>
        ),
      },
      {
        Header: "Date Created",
        accessor: "date",
        Cell: ({ row: { original } }) => (
          <>
            {original.createdAt
              ? format(
                  new Date(
                    `${original.day}, ${original.month}, ${original.year}`
                  ),
                  "dd MMM yyyy"
                )
              : "-"}
          </>
        ),
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ row: { original } }) => (
          <TableRender>{original.vendor ? original.vendor : "-"}</TableRender>
        ),
      },
      {
        Header: "",
        accessor: "actionButtons",
        Cell: ({ row: { original } }) => (
          // <TableDropdown data={original} id={original.id}  actions={getTableActions(original.id)} />
          <TableDropdown
            data={original}
            id={original.id}
            handleDeleteExpense={handleDeleteExpense}
            firebase={firebase}
            handleFetchExpenses={handleFetchExpenses}
          />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (fetchLoading) {
    return <FullPageSpinner />;
  }

  return (
    <Box>
      <Box>
        {!!expensesData.length && (
          <PageHeader
            handleAddExpense={handleAddExpense}
            isLoading={isLoading}
          />
        )}
        {!expensesData.length ? (
          <EmptyPage
            heading="You have no expenses"
            subheading="Click the button below to create an expense"
            image={EmptyImage}
            imageSize="400px"
            width="500px"
          >
            <Button
              size="sm"
              fontWeight="normal"
              variantColor="purple"
              width={["100%", "unset", "unset", "unset"]}
            >
              Add new expense
            </Button>
          </EmptyPage>
        ) : (
          <ExpensesTable data={expensesData} columns={columns} />
        )}
      </Box>
    </Box>
  );
}

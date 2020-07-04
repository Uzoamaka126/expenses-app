import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Box, Button, useDisclosure, useToast, Flex } from "@chakra-ui/core";
import { ExpensesTable } from "./index";
import EmptyImage from "../../../assets/empty_page_2.svg";
import { TableDropdown } from "./components/TableDropdown";
import { TableRender } from "./Expenses.Table";
import { getState } from "../../../Utilities/useLocalStorage";
import { ToastBox, FullPageSpinner, PageHeader, EmptyPage } from "../../UI";
import { NameFilter } from "./components/Filter";
export function ExpensesConsumer({ firebase, history }) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  // const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [expensesData, setExpensesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategoryTerm, setSearchCategoryTerm] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [add, setAdd] = useState({});

  const { uid } = getState();
  const toast = useToast();

  useEffect(() => {
    handleFetchExpenses(uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearchNameChange(event) {
    setSearchTerm(event.target.value);
  }

  // function handleSearchCategoryChange(event) {
  //   setSearchCategoryTerm(event.target.value);
  // }

  console.log(expensesData);

  function handleDeleteExpense(id) {
    // setIsDeleteLoading(true);
    firebase
      .doDeleteUserExpense(id)
      .then(() => {
        if (expensesData) {
          const updatedArray = expensesData.filter((item) => item.id !== id);
          setExpensesData(updatedArray);
        }
        // setIsDeleteLoading(false);
        handleFetchExpenses(uid);
        toast({
          position: "bottom-left",
          render: () => <ToastBox message="Expense deleted" />,
        });
        onClose();
      })
      .catch((error) => {
        // setIsDeleteLoading(false);
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

  function expensesList() {
    if (searchTerm) {
      const results = expensesData.filter((item) =>
        item.expenses_name.toLowerCase().includes(searchTerm.trim())
      );
      return results;
    }
    if (searchCategoryTerm) {
      const results = expensesData.filter((item) =>
        item.category_name.toLowerCase().includes(searchCategoryTerm.trim())
      );
      return results;
    }
    if (searchTerm && searchCategoryTerm) {
      const results = expensesData.filter(
        item =>
          item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) &&
          item.category
            .toLowerCase()
            .includes(searchCategoryTerm)
      );
      return results;
    }
    return expensesData;
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
        {!!expensesList().length && (
          <Box>
            <PageHeader
              handleAddExpense={handleAddExpense}
              isLoading={isLoading}
            />
            <Flex>
              <NameFilter
                query={searchTerm}
                onChange={handleSearchNameChange}
              />
            </Flex>
          </Box>
        )}
        {!expensesList().length ? (
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
            <ExpensesTable data={expensesList()} columns={columns} />
        )}
      </Box>
    </Box>
  );
}

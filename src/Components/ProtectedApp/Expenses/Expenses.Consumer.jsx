import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Box,
  Button,
  useDisclosure,
  useToast,
  Flex,
  Text,
  Image,
} from "@chakra-ui/core";
import { ExpensesTable } from "./index";
import EmptyImage from "../../../assets/empty_page_2.svg";
import { TableDropdown } from "./components/TableDropdown";
import { TableRender } from "./Expenses.Table";
import { getState } from "../../../Utilities/useLocalStorage";
import { ToastBox, FullPageSpinner, PageHeader, EmptyPage } from "../../UI";
import { NameFilter, CategoriesFilter } from "./components/Filter";
import Search from "../../../assets/search.svg";
export function ExpensesConsumer({ firebase, history }) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  // const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [expensesData, setExpensesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategoryTerm, setSearchCategoryTerm] = useState("");
  const [showFilter, setShowFilter] = useState(true);
  const { onClose } = useDisclosure();
  const [add, setAdd] = useState({});

  const { uid } = getState();
  const toast = useToast();

  // useEffect(() => {
  //   handleFetchExpenses(uid);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  function handleShowFilters() {
    setShowFilter(!showFilter);
  }

  function handleSearchNameChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchCategoryChange(event) {
    setSearchCategoryTerm(event.target.value);
  }

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

  let results;
  function expensesList() {
    if (searchTerm) {
      results = expensesData.filter((item) =>
        item.expenses_name.toLowerCase().includes(searchTerm.trim())
      );
      return results;
    }
    if (searchCategoryTerm) {
      results = expensesData.filter((item) =>
        item.category_name.toLowerCase().includes(searchCategoryTerm)
      );
      return results;
    }
    if (searchTerm && searchCategoryTerm) {
      results = expensesData.filter(
        (item) =>
          item.expenses_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          item.category_name.toLowerCase().includes(searchCategoryTerm)
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
        {/* if there is no array length and 
        there is no array of actual expenses and 
        there is no array of resuts */}
        {!expensesList().length &&
        expensesList() !== expensesData &&
        expensesList() !== results ? (
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
        ) : expensesList().length ? (
          <ExpensesTable data={expensesList()} columns={columns} />
        ) : (
          <Box>
            <PageHeader
              handleAddExpense={handleAddExpense}
              isLoading={isLoading}
            />
            <Flex
              alignItems="center"
              marginLeft="1rem"
              justifyContent="space-between"
            >
              <Button
                variantColor="pink"
                variant="ghost"
                fontSize="0.8rem"
                marginLeft="0.1rem"
                padding="0rem"
                leftIcon="view-off"
                onClick={handleShowFilters}
                _hover={{ background: "transparent" }}
                _focus={{ border: "none", backgroundColor: "transparent" }}
                _active={{ border: "none", backgroundColor: "transparent" }}
              >
                Hide Filters
              </Button>
              <Button
                variantColor="green"
                variant="ghost"
                fontSize="0.8rem"
                marginLeft="1rem"
                marginRight="2rem"
                padding="0rem"
                leftIcon="external-link"
                _hover={{ background: "transparent" }}
                _focus={{ border: "none", backgroundColor: "transparent" }}
                _active={{ border: "none", backgroundColor: "transparent" }}
              >
                Generate Report
              </Button>
            </Flex>
            {!!showFilter && (
              <div
                style={
                  !!showFilter
                    ? {
                        paddingLeft: "2rem",
                        display: "inline-flex",
                        visibility: "visible",
                        opacity: 1,
                        transition: "opacity 2s linear",
                      }
                    : {
                        paddingLeft: "2rem",
                        display: "inline-flex",
                        visibility: "hidden",
                        opacity: 0,
                        transition: "visibility 0s 2s, opacity 2s linear",
                      }
                }
              >
                <NameFilter
                  query={searchTerm}
                  onChange={handleSearchNameChange}
                />
                <CategoriesFilter
                  query={searchCategoryTerm}
                  onChange={handleSearchCategoryChange}
                />
              </div>
            )}
            <Box margin="auto" width="50%" marginTop="5rem" marginBottom="3rem">
              <Image src={Search} width="300px" height="200px" margin="auto" />
              <Text
                fontSize="1.25rem"
                color="#636363"
                textAlign="center"
                marginTop="1rem"
              >
                No match for your search
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

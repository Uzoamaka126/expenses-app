import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Box, Button, Stack, useDisclosure, useToast } from "@chakra-ui/core";
import { ExpensesTable } from "./index";
import { EmptyPage, PageHeader } from "../../index";
import EmptyImage from "../../../assets/empty_page_2.svg";
import { TableDropdown } from "./components/TableDropdown";
import { TableRender } from "./Expenses.Table";
import { getState } from "../../../Utilities/useLocalStorage";
import { CreateNewExpenseModal } from "./components/AddNewExpenseModal";
import { ToastBox } from "../../ToastBox";
import { DeleteExpenseModal } from "./components/DeleteExpensesModal";

export function ExpensesConsumer({ firebase, history }) {
  const [isLoading, setIsLoading] = useState(false);
  const [expensesData, setExpensesData] = useState([]);
  const [isError, setIsError] = useState(null);
  const [onOpenDelete, setOnOpenDelete] = useState(false);
  const [onOpenEdit, setOnOpenEdit] = useState(false);
  
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { uid } = getState();

  useEffect(() => {
    if (uid) {
      handleFetchExpenses(uid);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  console.log(expensesData);

  function getTableActions(data) {
    const tableActions = [
      {
        icon: "edit",
        label: "Edit this expense",
        onClick: () => setOnOpenEdit(true),
      },
      {
        icon: "delete",
        label: "Delete this expense",
        onClick: () => setOnOpenDelete(true),
      },
    ];
    return tableActions;
  }

  function closeDeleteModal() {
     setOnOpenDelete(false)
  }
  
  function showModalEdit() {
    setOnOpenEdit(true);
  };

  function hideModalEdit() {
    setOnOpenEdit(false);
  };

  function getSingleExpense(id) {
    setIsLoading(true);
    firebase
      .doGetSingleExpense(id)
      .then(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          position: "bottom-left",
          render: () => <ToastBox message={error} />,
        });
      });
  }
  function handleEditExpense(data) {
    setIsLoading(true);
    firebase
      .doEditUserExpense(data)
      .then((doc) => {
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          position: "bottom-left",
          render: () => <ToastBox message={error} />,
        });
      });
  }

  function handleDeleteExpense(id) {
    setIsLoading(true);
    firebase
      .doDeleteUserExpense(id)
      .then(() => {
        setIsLoading(false);
        toast({
          position: "bottom-left",
          render: () => <ToastBox message="Expense deleted" />,
        });
        onClose();
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          position: "bottom-left",
          render: () => <ToastBox message={error} />,
        });
        onClose();
      });
  }

  function handleFetchExpenses(userId) {
    firebase
      .doGetUserExpenses(userId)
      .then((result) => {
        setExpensesData(
          result.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
      });
  }

  function handleAddExpense(data) {
    setIsLoading(true);
    firebase
      .doAddUserExpense(data)
      .then((result) => {
        setIsLoading(false);
        onClose();
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
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
          <TableDropdown data={original} id={original.id}  actions={getTableActions(original)} />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Box>
      {/* {(value) => ( */}
      <Box>
        {!!expensesData.length && (
          <PageHeader title="Expenses">
            <Stack
              isInline
              flexWrap="wrap"
              alignItems="center"
              spacing={[0, "0.5rem", "0.5rem", "0.5rem"]}
            >
              {/* A filter component should be here. Filter by vendor or month or year */}
              <Button
                size="sm"
                onClick={onOpen}
                fontWeight="normal"
                variantColor="purple"
                width={["100%", "unset", "unset", "unset"]}
              >
                Add new expense
              </Button>
            </Stack>
          </PageHeader>
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
              // onClick={onOpen}
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
      <CreateNewExpenseModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleAddExpense}
        isLoading={isLoading}
      />
      <DeleteExpenseModal
        onOpenDelete={onOpenDelete}
        onClose={closeDeleteModal}
        onClick={handleDeleteExpense}
        isLoading={isLoading}
      />
    </Box>
  );
}

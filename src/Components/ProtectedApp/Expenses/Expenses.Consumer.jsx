import React from "react";
import { format } from "date-fns";
import { Box, Flex, Text, Button, Stack } from "@chakra-ui/core";
import { ExpensesContext, ExpensesTable } from "./index";
import { EmptyPage, PageHeader } from "../../index";
import EmptyImage from "../../../assets/empty_page_2.svg";
import { TableDropdown } from "./components/TableDropdown";
import { TableRender } from "./Expenses.Table";

export function ExpensesConsumer(props) {
  function getTableActions(data) {
    const tableActions = [
      {
        icon: "edit",
        label: "Edit this expense",
        onClick: (data) => handleEditExpense(data),
      },
      {
        icon: "delete",
        label: "Delete this expense",
        onClick: (data) => handleDeleteExpense(data),
      },
    ];
    return tableActions;
  }

  function handleEditExpense(expense) {}
  function handleDeleteExpense(expense) {}
  // function

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
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
        accessor: "category ",
        Cell: ({ row: { original } }) => (
          <>{original.category ? original.category : "-"}</>
        ),
      },
      {
        Header: "Date Created",
        accessor: "date",
        // Cell: ({ row: { original } }) => (
        //   <>
        //     {format(new Date(original.createdDatetime), "dd MMM yyyy, hh:mm:a")}
        //   </>
        // ),
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ row: { original } }) => (
          <TableRender>{original.content ? original.content : "-"}</TableRender>
        ),
      },
      {
        Header: "",
        accessor: "actionButtons",
        Cell: ({ row: { original } }) => (
          <TableDropdown data={original} actions={getTableActions(original)} />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <ExpensesContext.Consumer>
      {(value) => (
        <Box>
          <PageHeader title="Expenses">
            <Stack
              isInline
              flexWrap="wrap"
              alignItems="center"
              spacing={[0, "0.5rem", "0.5rem", "0.5rem"]}
            >
              {/* A filter component should be here */}
              <Button
                size="sm"
                // onClick={onOpen}
                fontWeight="normal"
                variantColor="purple"
                width={["100%", "unset", "unset", "unset"]}
              >
                Add new expense
              </Button>
            </Stack>
          </PageHeader>
          {!value?.expenses.length ? (
            <EmptyPage
              heading="You have no expenses"
              subheading="Click the button below to create an expense"
              image={EmptyImage}
              imageSize="400px"
              width="500px"
            //   height="300px"
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
            <ExpensesTable data={value.expenses} columns={columns} />
          )}
        </Box>
      )}
    </ExpensesContext.Consumer>
  );
}

{
  /* <CreateCampaignModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddCampaign}
            isLoading={loading === "pending"}
          /> */
}
{
  /* <ConfirmModal
            title="Delete campaign"
            isOpen={!!campaignToDelete}
            onConfirm={handleCampaignDelete}
            isLoading={loading === "pending"}
            onClose={() => setCampaignToDelete(undefined)}
          /> */
}

import {
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  Icon,
} from "@chakra-ui/core";
import React from "react";

export function TableDropdown({
  data,
  id,
  handleEditExpense,
  handleDeleteExpense,
  firebase
}) {

  // function getTableActions(data) {
    const tableActions = [
      {
        icon: "edit",
        label: "Edit this expense",
        onClick: () => handleEditExpense(id),
      },
      {
        icon: "delete",
        label: "Delete this expense",
        onClick: () => handleDeleteExpense(id),
      },
    ];
    // return tableActions;
  // }

  return (
    <Popover usePortal placement="bottom-end">
      <PopoverTrigger>
        <Button
          size="sm"
          width="100%"
          display="flex"
          minWidth="unset"
          textAlign="center"
          variant="unstyled"
          padding="0 0.5rem"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Icon top="4px" name="menu" size="0.875rem" position="relative" />
        </Button>
      </PopoverTrigger>
      <PopoverContent zIndex={10000} maxWidth="180px">
        <List>
          {tableActions.map((action, i) => (
            <ListItem
              key={i}
              outline="none"
              cursor="pointer"
              _hover={{ backgroundColor: "gray.100" }}
              onClick={() => action.onClick && action.onClick()}
            >
              <Stack
                isInline
                as="button"
                width="100%"
                spacing="2px"
                outline="none"
                cursor="pointer"
                padding="0.5rem"
                fontSize="0.75rem"
                alignItems="center"
              >
                {action.icon && (
                  <Box>
                    <ListIcon
                      size="0.75rem"
                      color="#66788a"
                      icon={action.icon}
                    />
                  </Box>
                )}
                <Box>
                  <Text>{action.label}</Text>
                </Box>
              </Stack>
            </ListItem>
          ))}
        </List>
      </PopoverContent>
    </Popover>
  );
}

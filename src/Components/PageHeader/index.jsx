import * as React from "react";
import {
  Heading,
  Flex,
  Box,
  Stack,
  Button,
  useDisclosure,
} from "@chakra-ui/core";
import { CreateNewExpenseModal } from "../ProtectedApp/Expenses/components/AddNewExpenseModal";

export function PageHeader({ handleAddExpense, isLoading }) {
  const { onClose, onOpen, isOpen } = useDisclosure();
  return (
    <>
      <Flex
        padding="1rem"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box paddingBottom="0.5rem">
          <Heading as="h4" fontSize="1.125rem" fontWeight={500} color="#212121">
            Expenses
          </Heading>
        </Box>
        <Box>
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
        </Box>
      </Flex>
      <CreateNewExpenseModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleAddExpense}
        isLoading={isLoading}
      />
    </>
  );
}

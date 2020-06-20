import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  Button,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/core";

export function DeleteExpenseModal({
  onOpenDelete,
  onClose,
  isLoading,
  onClick,
}) {
  const cancelRef = React.useRef();
  return (
    <AlertDialog
      isOpen={onOpenDelete}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Delete Expense
        </AlertDialogHeader>

        <AlertDialogBody>
          Are you sure? You can't undo this action afterwards.
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button variantColor="red" isLoading={isLoading} onClick={onClick} ml={3}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

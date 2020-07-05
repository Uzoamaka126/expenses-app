import React from "react";
import {
  Box,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/core";

export function CustomAlert({ maxObj }) {
  const { category, amount } = maxObj;
  return (
    <Box>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Excess spending!</AlertTitle>
        <AlertDescription>
          You are spending too much money on {category} by this amount: N
          {amount}!
        </AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    </Box>
  );
}

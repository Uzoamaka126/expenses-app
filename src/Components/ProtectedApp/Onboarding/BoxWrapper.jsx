import React from "react";
import { Box, Text } from "@chakra-ui/core";
export function Wrapper({ children }) {
  return (
    <Box
      borderRadius="5px"
      width="fit-content"
      padding="0.625rem 1rem"
      marginX="auto"
      background="#fff"
      boxShadow=""
      maxHeight="200px"
      height="200px"
    >
      {children}
    </Box>
  );
}

export function Title({ heading }) {
  return (
    <Text fontSize="1.3rem" color="rgb(0, 54, 72)" fontWeight="semibold">
      {heading}
    </Text>
  );
}

export function SubTitle({ text }) {
  return (
    <Text color="#6666666" fontSize="1.1rem" fontWeight="normal">
      {text}
    </Text>
  );
}

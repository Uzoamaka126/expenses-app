import React from "react";
import { Box } from "@chakra-ui/core";
import { Header } from "./Header";

export function Content({ children, ...props }) {
  return (
    <Box as="main" flex="1" width="calc(100% - 215px)" {...props}>
      <Header />
      <Box height="calc(100vh -60px)" background="#fbfbfb">
        <Box height="100%" overflow="auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
}

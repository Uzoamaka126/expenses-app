import * as React from "react";
import { Box, Spinner } from "@chakra-ui/core";

export function FullPageSpinner(props) {
  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Spinner
        size="md"
        speed="0.9s"
        thickness="3px"
        color="pink"
        emptyColor="gray.200"
      />
    </Box>
  );
}

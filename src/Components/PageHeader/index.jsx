import * as React from "react";
import { Heading, Flex, Box } from "@chakra-ui/core";

export function PageHeader({
  title,
  children,
  ...props
}) {
  return (
    <Flex
      padding="1rem"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      <Box paddingBottom="0.5rem">
        <Heading as="h4" fontSize="1.125rem" fontWeight={500} color="#212121">
          {title}
        </Heading>
      </Box>
      <Box>{children}</Box>
    </Flex>
  );
}

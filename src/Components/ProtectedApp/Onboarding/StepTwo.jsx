import React from "react";
import { Box } from "@chakra-ui/core";
import { Wrapper, Title, SubTitle } from "./BoxWrapper";

export function StepTwo(props) {
  return (
    <Wrapper>
      <Box height="100%">
        <Title heading="You can select from a pre-defined list of 20 values." />
        <SubTitle text="These values have been carefully picked and fit into neat categories." />
      </Box>
    </Wrapper>
  );
}

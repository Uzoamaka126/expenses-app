import React from "react";
import { Wrapper, Title, SubTitle } from "./BoxWrapper";

export function StepOne(props) {
  return (
    <Wrapper>
      <Title heading="What does Essentialism do?" />
      <SubTitle
        text="Essentialism helps you set principles you would like to have and work
        towards achieveing them. Like a to-do list, but for solely for self-development."
      />
    </Wrapper>
  );
}

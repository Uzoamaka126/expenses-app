import React, { useState } from "react";
import { Box, Text, Flex, Button, Progress } from "@chakra-ui/core";
import { StepOne } from './StepOne';
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";

export function Onboarding({ history }) {
  const [step, setStep] = useState(1);
  const [progressValue, setProgressValue] = useState(25);

  function nextStep() {
    setStep(step + 1);
    setProgressValue(progressValue + 25);
  }

  function previousStep() {
    setStep(step - 1);
    setProgressValue(progressValue - 25);
  }

  function renderSteps() {
    switch (step) {
      case 1:
        return <StepOne previousStep={previousStep} nextStep={nextStep} />;
      case 2:
        return <StepTwo previousStep={previousStep} nextStep={nextStep} />;
      case 3:
        return (
          <StepThree
            previousStep={previousStep}
          />
        );
      default:
        return <StepOne />;
    }
  }

  return (
    <Box>
      <Box textAlign="left" marginY="2.5rem" marginLeft="2rem">
        <Text fontSize="1.3rem" color="rgb(0, 54, 72)" fontWeight="semibold">
          Welcome to Expenses Tracker!
        </Text>
        <Text fontSize="1rem" color="#636363" fontWeight="normal">
          Let's get you started with a few tips:
        </Text>
      </Box>
      <Box
        border="1px solid #eee"
        maxWidth="600px"
        margin="3rem auto"
        borderRadius="5px"
        padding="0"
        boxShadow="0 6px 12px 0 rgba(51,51,51,0.1)"
      >
        <Box width="100%">
          <Progress
            color="pink"
            size="sm"
            marginBottom="1rem"
            width="100%"
            value={progressValue}
          />
        </Box>
        <Box>{renderSteps()}</Box>
        <Flex
          justifyContent="space-between"
          marginTop="0.625rem"
          alignItems="center"
          padding="1.2rem 1.2rem"
        >
          <Button
            variant="ghost"
            color="#e91e63"
            _focus={{ border: "none" }}
            isDisabled={step === 1 ? true : false}
            onClick={previousStep}
            boxShadow="none"
            background="transparent"
            borderWidth="0"
          >
            Prev
          </Button>
          <Button
            color="#e91e63"
            variant="ghost"
            borderWidth="0"
            _focus={{ border: "none" }}
            isDisabled={step > 3 ? true : false}
            onClick={nextStep}
          >
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

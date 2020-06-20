import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  Text,
} from "@chakra-ui/core";
import styled from "styled-components";


const Modal = styled.div`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid black;

    &.display-block {
      display: block;
    }

    &.display-none {
      display: none;
    }

    .modal-main {
      position: fixed;
      background: white;
      width: 80%;
      height: auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
export function DeleteExpenseModal({ handleClose, onOpenDelete, children }) {
  const showHideClassName = onOpenDelete
    ? "modal display-block"
    : "modal display-none";

  const [inputValue, setInputValue] = React.useState({
    name: "",
    category: "",
    amount: "",
    vendor: "",
  });

  const inputNameRef = React.useRef(null);
  const inputCategoryRef = React.useRef(null);
  const inputVendorRef = React.useRef(null);
  const inputAmountRef = React.useRef(null);

  React.useEffect(() => {
    if (inputNameRef.current) {
      inputNameRef.current.focus();
    } else if (inputCategoryRef.current) {
      inputCategoryRef.current.focus();
    } else if (inputVendorRef.current) {
      inputVendorRef.current.focus();
    } else if (inputAmountRef.current) {
      inputAmountRef.current.focus();
    }
  }, []);

  return (
    <div className={showHideClassName}>
      <Box>
        <Text fontSize="16px" fontWeight="semibold">
          Create a new expense
        </Text>
      </Box>
      <Divider />
      <Box>
        <Box marginTop="1rem" marginBottom="1rem">
          <FormControl marginBottom="1rem">
            <FormLabel fontSize="0.875rem" marginBottom="0.2rem">
              Expense Name
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="name"
              ref={inputNameRef}
              value={inputValue.name}
              onChange={(event) => handleChange(event)}
              placeholder="What's the name of your expense?"
            />
          </FormControl>
          <FormControl marginBottom="1rem">
            <FormLabel fontSize="0.875rem" marginBottom="0.2rem">
              Expense Category
            </FormLabel>
            <Select
              placeholder="Select option"
              name="category"
              value={inputValue.category}
              ref={inputCategoryRef}
              onChange={(event) => handleChange(event)}
            >
              {categories.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl marginBottom="1rem">
            <FormLabel fontSize="0.875rem" marginBottom="0.2rem">
              Expense Amount
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="amount"
              ref={inputAmountRef}
              value={inputValue.amount}
              onChange={(event) => handleChange(event)}
              placeholder="How much did you pay for on this item?"
            />
          </FormControl>
          <FormControl marginBottom="1rem">
            <FormLabel fontSize="0.875rem" marginBottom="0.2rem">
              Expense Vendor
            </FormLabel>
            <Input
              size="sm"
              type="text"
              name="vendor"
              ref={inputVendorRef}
              value={inputValue.vendor}
              onChange={(event) => handleChange(event)}
              placeholder="Who did you purchase this item from?"
            />
          </FormControl>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Stack isInline>
          <Button size="sm" onClick={onClose} fontWeight="normal">
            Cancel
          </Button>
          <Button
            size="sm"
            variantColor="purple"
            width={["100%", "unset", "unset", "unset"]}
            fontWeight="normal"
            isLoading={isLoading}
            isDisabled={!inputValue}
            onClick={() => onSubmit(inputValue)}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

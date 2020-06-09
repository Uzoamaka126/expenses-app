import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Stack,
  Select,
  Text,
} from "@chakra-ui/core";
import React from "react";
import { ModalContainer } from "../../../ModalContainer";

const categories = [
  "Apps",
  "Donations",
  "Entertainment",
  "Family & Friends",
  "Food",
  "Games",
  "Media Subscriptions",
  "Outings",
  "Partners",
  "Skincare",
  "Transport",
];
export function CreateNewExpenseModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) {
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

  function handleChange(event) {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={inputNameRef}
    >
      <ModalHeader>
        <Text fontSize="16px" fontWeight="semibold">
          Create a new expense
        </Text>
        <ModalCloseButton
          color="#66788a"
          fontSize="0.875rem"
          _focus={{ border: "none" }}
        />
      </ModalHeader>
      <Divider />
      <ModalBody>
        <Box>
          <Text color="#212242" fontSize="0.875rem">
            Record a new expense to keep track of your spending .
          </Text>
        </Box>
        <Box marginTop="2rem" marginBottom="1rem">
          <FormControl>
            <FormLabel fontSize="0.875rem" marginBottom="0.2rem">
              Expense Name
            </FormLabel>
            <Input
              size="sm"
              type="text"
              ref={inputNameRef}
              value={inputValue.name}
              onChange={handleChange}
              placeholder="Give your campaign a name â€¦"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="0.875rem" marginBottom="0.2rem">
              Expense Category
            </FormLabel>
            <Select
              placeholder="Select option"
              value={inputValue.category}
              ref={inputCategoryRef}
            >
              {categories.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="0.875rem" marginBottom="0.2rem">
              Expense Amount
            </FormLabel>
            <Input
              size="sm"
              type="text"
              ref={inputAmountRef}
              value={inputValue.amount}
              onChange={handleChange}
              placeholder="Give your campaign a name â€¦"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="0.875rem" marginBottom="0.2rem">
              Expense Vendor
            </FormLabel>
            <Input
              size="sm"
              type="text"
              ref={inputVendorRef}
              value={inputValue.vendor}
              onChange={handleChange}
              placeholder="Give your campaign a name â€¦"
            />
          </FormControl>
        </Box>
      </ModalBody>
      <Divider />
      <ModalFooter>
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
            onClick={() => onSubmit({ inputValue })}
          >
            Add
          </Button>
        </Stack>
      </ModalFooter>
    </ModalContainer>
  );
}

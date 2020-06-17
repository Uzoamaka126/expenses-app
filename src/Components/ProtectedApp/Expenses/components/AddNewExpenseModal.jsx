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
import { getState } from "../../../../Utilities/useLocalStorage";

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
  const { uid } = getState();
  const [inputValue, setInputValue] = React.useState({
    id: uid,
    name: "",
    category: "",
    amount: "",
    vendor: "",
  });
  const inputNameRef = React.useRef(null);
  const inputCategoryRef = React.useRef(null);
  const inputVendorRef = React.useRef(null);
  const inputAmountRef = React.useRef(null);

  // React.useEffect(() => {
  //   if (inputNameRef.current) {
  //     inputNameRef.current.focus();
  //   } else if (inputCategoryRef.current) {
  //     inputCategoryRef.current.focus();
  //   } else if (inputVendorRef.current) {
  //     inputVendorRef.current.focus();
  //   } else if (inputAmountRef.current) {
  //     inputAmountRef.current.focus();
  //   }
  // }, []);

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
              onChange={event => handleChange(event)}
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
              onChange={event => handleChange(event)}
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
              onChange={event => handleChange(event)}
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
              onChange={event => handleChange(event)}
              placeholder="Who did you purchase this item from?"
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
            onClick={() => onSubmit(inputValue)}
          >
            Add
          </Button>
        </Stack>
      </ModalFooter>
    </ModalContainer>
  );
}

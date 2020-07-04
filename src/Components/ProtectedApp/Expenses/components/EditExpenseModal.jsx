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
import { ModalContainer } from "../../../UI/ModalContainer";
// import { getState } from "../../../../Utilities/useLocalStorage";
import { categories } from './data'

export function EditExpenseModal({
  isOpen,
  onClose,
  data,
  isLoading,
  onSubmit,
}) {
  
  const [inputValues, setInputValues] = React.useState({
    id: "",
    name: "",
    category: "",
    amount: "",
    vendor: "",
  });
  const inputNameRef = React.useRef(null);

  function handleChange(event) {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  }

  React.useEffect(() => {
    if (data) {
      setInputValues({
        ...inputValues,
        id: data.id,
        name: data.expenses_name,
        category: data.category_name,
        amount: data.amount,
        vendor: data.vendor,
      });
    }
  }, [data]);

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={inputNameRef}
    >
      <ModalHeader>
        <Text fontSize="16px" fontWeight="semibold">
          Edit this expense
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
              value={inputValues.name}
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
              value={inputValues.category}
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
              value={inputValues.amount}
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
              value={inputValues.vendor}
              onChange={(event) => handleChange(event)}
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
            isDisabled={!inputValues}
            onClick={() => onSubmit(inputValues)}
          >
            Update
          </Button>
        </Stack>
      </ModalFooter>
    </ModalContainer>
  );
}

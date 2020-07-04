import React from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
//   Button,
//     Select,
//   IconButton
} from "@chakra-ui/core";
export function DateFilters() {
  return <Box></Box>;
}

export function NameFilter({ query, onChange }) {
//   const [name, setName] = React.useState(query);

//   function handleChange(event) {
//     setName(event.target.value);
//   }

  return (
    <Box>
      <FormControl marginBottom="1rem">
        <FormLabel marginBottom="0rem">Email address</FormLabel>
        <Input
          id="name"
          type="text"
          name="query"
          value={query}
          background="#f7fbfb"
          aria-describedby="email-helper-text"
          placeholder="Type in a name"
          onChange={onChange}
        />
      </FormControl>
      {/* <IconButton onClick={() => onSubmit(name)} icon="search" /> */}
    </Box>
  );
}

export function CategoriesFilter() {
  return <Box></Box>;
}

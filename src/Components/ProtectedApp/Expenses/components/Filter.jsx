import React from "react";
import { Box, Input, FormControl, FormLabel, Select } from "@chakra-ui/core";
export function DateFilters() {
  return <Box></Box>;
}

export function NameFilter({ query, onChange }) {
  return (
    <FormControl marginBottom="1rem" marginTop="1rem">
      <FormLabel marginBottom="0rem" fontSize="0.8rem" color="#636363">
        Filter By Name
      </FormLabel>
      <Input
        id="name"
        type="text"
        name="query"
        value={query}
        background="#f7fbfb"
        aria-describedby="email-helper-text"
        placeholder="Type in a name"
        onChange={onChange}
        fontSize="0.8625rem"
      />
    </FormControl>
  );
}

export function CategoriesFilter({ query, onChange }) {
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
  return (
    <FormControl marginBottom="1rem" marginTop="1rem" marginLeft="1.5rem">
      <FormLabel marginBottom="0rem" fontSize="0.8rem" color="#636363">
        Filter By Category
      </FormLabel>
      <Select onChange={(event) => onChange(event)} value={query}>
        {categories.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

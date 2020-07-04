import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/core";
import * as React from "react";

export function Search({ value, onChange, placeholder, ...rest }) {
    const [inputValue, setInputValue] = React.useState('');
  
    function handleChange(event) {
        setInputValue(event.target.value)
        onChange && onChange();
    }
    
    return (
    <InputGroup size="sm" display="flex" alignItems="center" {...rest}>
      <InputLeftElement>
        <Icon name="search" color="#c0c3cc" />
      </InputLeftElement>
      <Input
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        background="#f6f8fc"
        border="1px solid #eee"
        _focus={{ backgroundColor: "transparent" }}
      />
    </InputGroup>
  );
}

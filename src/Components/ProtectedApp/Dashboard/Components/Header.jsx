import React from "react";
import {
  Box,
  // Button,
  Flex,
  // Image,
  Stack,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverArrow,
  PopoverTrigger,
} from "@chakra-ui/core";
import SignOutButton from "./SignOutButton";

export function Header() {
  return (
    <Box
      height="60px"
      // background="#e3e8ee"
      background="#fff"
      borderLeft="solid 1px rgba(0,0,0,.05)"
      borderBottom="1px solid #eee"
    >
      <Flex justifyContent="flex-end">
        <Stack isInline spacing={2} alignItems="center" paddingRight="2rem">
          <IconButton
            icon="bell"
            variant="ghost"
            size="sm"
            aria-label="notification icon"
          />
          {/* <Image
            rounded="full"
            size="40px"
            alt="circle with users name on it"
            bg="pink"
          /> */}
          <Popover usePortal>
            <PopoverTrigger>
              <IconButton
                variant="ghost"
                icon="chevron-down"
                aria-label="arrow down icon"
              />
            </PopoverTrigger>
            <PopoverContent width="100px" zIndex={4}>
              <PopoverArrow />
              <PopoverBody>
                <SignOutButton />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Stack>
      </Flex>
    </Box>
  );
}

import React from 'react';
import { Box } from '@chakra-ui/core';

export function ToastBox({ message }: { message: string }) {
    return (
        <Box
            m={3}
            p={3}
            bg="black"
            color="white"
            roundedLeft="4px"
            roundedRight="4px"
        >
            {message}
        </Box>
    );
}

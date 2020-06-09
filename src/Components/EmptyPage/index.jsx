import {
    Box,
    Flex,
    Heading,
    Image,
    Text,
    // Icon,
} from '@chakra-ui/core';
import React from 'react';

export function EmptyPage({
    width,
    image,
    heading,
    children,
    imageSize,
    subheading,
    height = '100%',
    ...rest
}) {
    return (
        <Flex
            {...rest}
            height={height}
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            textAlign="center"
            padding="2rem 0"
        >
            {image && (
                <Box height="180px" width={imageSize} paddingBottom="2rem">
                    <Image src={image} alt="" width="100%" height="100%" maxWidth="100%" />
                </Box>
            )}
            <Box width={width} marginX="auto">
                <Heading
                    size="md"
                    color="#212242"
                    fontWeight={500}
                    marginBottom="0.5rem"
                >
                    {heading}
                </Heading>
                <Text
                    opacity={0.5}
                    color="#212242"
                    fontSize="0.875rem"
                    marginBottom="1rem"
                >
                    {subheading}
                </Text>
            </Box>
            {children}
        </Flex>
    );
}

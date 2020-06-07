import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Text, Flex, Image, Link } from "@chakra-ui/core";
// import notfound from '../Components/assets/404.svg'

export function NotFound({ location }) {
  return (
    <Box width="50%" margin="4rem auto 0">
      <Box width="100%" height="150px">
        {/* <Image width="100%" height="100%" src={notfound} alt="a 404 image" /> */}
      </Box>
      <Box width="100%" marginTop="1rem">
        <Text color="#2e3c42" fontSize="2rem">
          Oops! No url: {location.pathname} does not exist.
        </Text>
        <Text textAlign="center" fontSize="1.125rem">
          Click
          <Link
            as={RouterLink}
            to="/login"
            color="#e91e63"
            fontSize="1rem"
            fontWeight="medium"
            marginX="0.35rem"
          >
            here
          </Link>
          to go to Home!
        </Text>
      </Box>
    </Box>
  );
}

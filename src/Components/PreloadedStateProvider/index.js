// This is a wrapper that fetches all the global states like the user account info,
// user values, projects if any, and the app's values
import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/core";
import { FullPageSpinner } from "../FullPageSpinner";
import { getState } from "../../Utilities/useLocalStorage";

export function PreloadedStateProvider(props) {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const userInfo = getState();
  const { uid, email, token } = userInfo.oldUser;

  function handleAllFetchOnLoad() {
    // setIsLoading(true);
    // Promise.all([fetchUserProfile(id), fetchValues()])
    //   .then(() => {
    //     setIsLoading(false);
    //     setError(false);
    //   })
    //   .catch(() => {
    //     setError(true);
    //     setIsLoading(false);
    //   });
    // fetchUserProfile(id);
    // fetchValues();
    // setIsLoading(false)
  }

//   useEffect(() => {
//     handleAllFetchOnLoad();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (error && !isLoading) {
    return (
      <Flex
        height="100vh"
        textAlign="center"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box width="100px" marginBottom="0.5rem">
          <Image src="" />
        </Box>
        <Heading>Oh dear!</Heading>
        <Text marginBottom="0.5rem">
          An error occurred <br />
          while trying to load this page.
        </Text>
        <Button variantColor="pink" onClick={handleAllFetchOnLoad}>
          Try again
        </Button>
      </Flex>
    );
  }
  return <>{children}</>;
}
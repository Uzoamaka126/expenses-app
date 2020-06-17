// This is a wrapper that fetches all the global states like the user account info,
// user values, projects if any, and the app's values
import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/core";
import { FullPageSpinner } from "../FullPageSpinner";
import { getState } from "../../Utilities/useLocalStorage";
import { FirebaseContext } from "../../Utilities/Firebase";

function PreloadedStateMainProvider(props) {
  const re = 2;
  return (
    <>
      <Box width="100%" margin="0 auto" maxWidth="448px">
        <FirebaseContext.Consumer>
          {(firebase) => (
            <PreloadedStateProvider hey={re} firebase={firebase} {...props} />
          )}
        </FirebaseContext.Consumer>
      </Box>
    </>
  )
}
export function PreloadedStateProvider(props) {
  const { firebase, hey, children } = props;
  console.log(props);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { uid, email, token } = getState();

  async function handleFetchExpenses(userId) {
    // const result = await firebase.doGetUserExpenses(userId);
    // return result;
    // .then((result) => {
    //   setExpensesData(result.docs.map(doc => ({
    //     ...doc.data(),
    //     id: doc.id
    //   })))
    // })
    // .catch((error) => {
    //   setIsError(true)
    //   console.log(error);
    // })
  }

  // function handleAllFetchOnLoad() {
  //   setIsLoading(true);
  //   // Promise.all([fetchUserProfile(id), fetchValues()])
  //   if (!!getState) {
  //     Promise.all([handleFetchExpenses(uid)])
  //       .then(() => {
  //         console.log("resolved");
  //         setIsLoading(false);
  //         setError(false);
  //       })
  //       .catch(() => {
  //         setError(true);
  //         setIsLoading(false);
  //       });
  //     handleFetchExpenses(uid);
  //     setIsLoading(false);
  //   }
  // }
  // useEffect(() => {
  //   handleAllFetchOnLoad();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
        {/* <Button variantColor="pink" onClick={handleAllFetchOnLoad}>
          Try again
        </Button> */}
      </Flex>
    );
  }
  return <>{children}</>;
}

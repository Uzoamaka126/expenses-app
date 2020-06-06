import React from "react";
import { Box } from "@chakra-ui/core";
import { FirebaseContext } from "../../../Utilities/Firebase";
import { LoginForm } from "./LoginForm";

function Login(props) {
  const { history } = props;

  return (
    <>
      <Box width="100%" margin="0 auto" maxWidth="448px">
        <FirebaseContext.Consumer>
          {(firebase) => (
            <LoginForm firebase={firebase} history={history} {...props} />
          )}
        </FirebaseContext.Consumer>
      </Box>
    </>
  );
}

export default Login;

import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  Text,
  Input,
  Box,
  //   FormErrorMessage,
  useToast,
} from "@chakra-ui/core";
import { ToastBox } from "../../ToastBox";

export function LoginForm({ firebase, history }) {
  const toast = useToast();

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const [submitError, setSubmitError] = React.useState("");

  const isInvalid = values.email === "" || values.password === "";

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    const { email, password } = values;
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setValues(values);
        toast({
          position: "bottom-left",
          render: () => <ToastBox message="User created" />,
        });
          history.push('/dashboard/home')
      })
      .catch((error) => {
        setSubmitError(error);
        toast({
          position: "bottom-left",
          render: () => <ToastBox message={submitError} />,
        });
      });
    event.preventDefault();
  }

  return (
    <>
      <Box>
        <Box width="100%" margin="0 auto" maxWidth="448px">
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              margin: "10rem auto 0",
              background: "#fff",
              border: "1px solid rgb(248, 248, 248)",
              padding: "1.5rem 1rem",
            }}
          >
            <FormControl marginBottom="1rem">
              <FormLabel marginBottom="0rem">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                name="email"
                value={values.email}
                background="#f7fbfb"
                aria-describedby="email-helper-text"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl marginBottom="1rem">
              <FormLabel marginBottom="0rem" htmlFor="password">
                Password
              </FormLabel>
              <Input
                type="password"
                background="#f7fbfb"
                name="password"
                id="password"
                aria-describedby="password-helper-text"
                placeholder="Enter password"
                value={values.password}
                onChange={handleChange}
              />
            </FormControl>
            <Box width="100%">
              <Button
                size="lg"
                variant="solid"
                marginBottom="0.875rem"
                background="#e91e63"
                color="#fff"
                border="none"
                width="100%"
                isDisabled={isInvalid}
              >
                Login
              </Button>
              <Text>
                Don't have an account?
                <Link
                  style={{
                    color: "#e91e63",
                    marginLeft: "0.25rem",
                  }}
                  to="/password"
                >
                  Sign up
                </Link>
              </Text>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}

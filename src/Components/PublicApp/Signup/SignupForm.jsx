import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  Text,
  Input,
  Box,
  FormErrorMessage,
  useToast,
  useDisclosure,
} from "@chakra-ui/core";
import { ToastBox } from "../../ToastBox";
import { SignupSuccess } from "./SignupSuccess";
import { setState } from "../../../Utilities/useLocalStorage";

export function SignupForm({ firebase, history }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [values, setValues] = React.useState({
    username: "",
    email: "",
    firstPassword: "",
    repeatPassword: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const isInvalid =
    values.firstPassword !== values.repeatPassword ||
    values.firstPassword === "" ||
    values.email === "" ||
    values.username === "";

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleSubmit(valuesObj) {
    const { email, firstPassword } = valuesObj;
    setIsLoading(true)
    firebase
      .doCreateUserWithEmailAndPassword(email, firstPassword)
      .then((authUser) => {
        setIsLoading(false);
        console.log(authUser)
        const { email, uid, xa:token } = authUser.user;
        setState({email, uid, token })
        setValues(values);
        toast({
          position: "bottom-left",
          render: () => <ToastBox message="User created" />,
        });
        onOpen();
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          position: "bottom-left",
            render: () => <ToastBox message={error.message} />,
        });
      });
  }

  return (
    <>
      <Box>
        <Box width="100%" margin="0 auto" maxWidth="448px">
          <form
            style={{
              width: "100%",
              margin: "10rem auto 0",
              background: "#fff",
              border: "1px solid rgb(248, 248, 248)",
              padding: "1.5rem 1rem",
            }}
          >
            <FormControl marginBottom="1rem">
              <FormLabel marginBottom="0rem">Username</FormLabel>
              <Input
                type="text"
                name="username"
                background="#f7fbfb"
                id="username"
                aria-describedby="username-helper-text"
                value={values.username}
                onChange={handleChange}
                placeholder="Enter username here"
              />
            </FormControl>
            <FormControl
              marginBottom="1rem"
            >
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
                name="firstPassword"
                id="firstPassword"
                aria-describedby="password-helper-text"
                placeholder="Enter password"
                value={values.firstPassword}
                onChange={handleChange}
              />
              {values.firstPassword.length < 6
                ? < FormErrorMessage marginBottom="0.625rem">
                  Password length must be greater than 6 characters
              </FormErrorMessage>
                : ""}
            </FormControl>
            <FormControl marginBottom="1rem">
              <FormLabel marginBottom="0rem" htmlFor="password">
                Confirm Password
              </FormLabel>
              <Input
                type="password"
                background="#f7fbfb"
                name="repeatPassword"
                id="repeatPassword"
                aria-describedby="password-helper-text"
                placeholder="Enter password"
                value={values.repeatPassword}
                onChange={handleChange}
              />
              {values.firstPassword !== values.repeatPassword
                ? < FormErrorMessage marginBottom="0.625rem">
                Passwords do not match
              </FormErrorMessage>
                : ""}
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
                isLoading={isLoading}
                onClick={() => handleSubmit(values)}
              >
                Sign up
              </Button>
              <Text>
                Don't have an account?
                <Link
                  style={{
                    color: "#e91e63",
                    marginLeft: "0.25rem",
                  }}
                  to="/login"
                >
                  Login
                </Link>
              </Text>
            </Box>
          </form>
        </Box>
      </Box>
      <SignupSuccess isOpen={isOpen} onClose={onClose} history={history} />
    </>
  );
}

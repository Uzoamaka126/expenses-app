import React from "react";
import {
  Button,
} from "@chakra-ui/core";
import { withFirebase } from "../../../../Utilities/Firebase";
import { clearAppState } from "../../../../Utilities/useLocalStorage";

function SignOutButton({ firebase }) {
    function logout() {
        firebase.doSignOut()
        clearAppState();
    }
 
    return (
        <Button type="button" onClick={logout} fontSize="1rem"
            _hover={{ background: "transparent" }}
            fontWeight="normal"
            variant="ghost">
            Log out
        </Button>
  )
};

export default withFirebase(SignOutButton);
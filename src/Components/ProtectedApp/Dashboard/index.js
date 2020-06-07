import React from "react";
import { Flex } from "@chakra-ui/core";
import { Content, SideBar } from "./Components";
import { clearAppState, getState } from "../../../Utilities/useLocalStorage";


const menuList = [
  { title: "Onboarding", url: "/dashboard/onboarding" },
  { title: "Values", url: "/dashboard/values" },
  {
    title: "Settings",
    subItems: [
      { title: "Profile", url: "/dashboard/settings/profile" },
      { title: "Change Password", url: "/dashboard/settings/password" },
    ],
    url: "/dashboard/settings",
  },
];

export function Dashboard({ firebase, children }) {

  // const { email } = getState() && getState();
  const email = getState()?.email;
  console.log(email);
  // const email = 'Amaka';
  const[isLoading, setIsLoading] = React.useState(false)

  function onLogout() {
    setIsLoading(true);
     firebase
       .doSignOut()
       .then(() => {
         setIsLoading(false)
         clearAppState();
       })
       .catch((error) => {
         setIsLoading(false)
        console.log(error.message)
       });
  }
  
  return (
    <>
      <Flex>
        <SideBar username={email} menuList={menuList} />
        <Content
          width="100%"
          height="calc(100vh -60px)"
          overflow="auto"
          position="fixed"
          paddingLeft="215px"
          backgroundColor="#fff"
          onLogout={onLogout}
        >
          {children}
        </Content>
      </Flex>
    </>
  );
}

import { theme } from "@chakra-ui/core";
import React from "react";

const customIcons = {
  menu: {
    path: (
      <path
        fill="currentColor"
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2S13.1 10 12 10zM18 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2S19.1 10 18 10zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2S7.1 10 6 10z"
      />
    )
  },
  // icon2: {
  //   path: (
  //     <g fill="currentColor">
  //       <path d="..."/>
  //     </g>
  //   )
  // }
};
export const customTheme = {
  ...theme,
  colors: theme.colors,
  brand: {
    10: "#6772e5",
    20: "#53f",
  },
  icons: {
    ...theme.icons,
    ...customIcons,
  },
};

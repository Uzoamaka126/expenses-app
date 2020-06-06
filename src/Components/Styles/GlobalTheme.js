import { theme } from "@chakra-ui/core";

// const customIcons = {
//     icon1: {
//     //   path: <path fill="currentColor" d="..." />,
//       // If the icon's viewBox is `0 0 24 24`, you can ignore `viewBox`
//       viewBox: "0 0 40 40",
//     },
//     // icon2: {
//     //   path: (
//     //     <g fill="currentColor">
//     //       <path d="..."/>
//     //     </g>
//     //   )
//     // }
//   };
export const customTheme = {
  ...theme,
  colors: theme.colors,
  brand: {
    10: "#6772e5",
    20: "#53f",
  },
  icons: {
    ...theme.icons,
    // ...customIcons,
  },
};

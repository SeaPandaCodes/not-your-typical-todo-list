import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      // body: {
      //   bg: mode("gray.200", "white.300")(props),
      // },
      body: {
        // color: "default",
        bg: mode("orange.50", "gray.800")(props),
      },
    }),
  },
});

export default theme;

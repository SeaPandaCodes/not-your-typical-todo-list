import "@/styles/globals.css";
import type { AppProps } from "next/app";
import theme from "../utils/theme";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import theme from "../utils/theme";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { trpc } from "@/utils/trpc";
import { Suspense } from "react";
import { Header } from "@/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Suspense fallback={<h1 style={{ color: "red" }}>LOADING...</h1>}>
        <Header />
        <Component {...pageProps} />
      </Suspense>
    </ChakraProvider>
  );
}

export default trpc.withTRPC(MyApp);

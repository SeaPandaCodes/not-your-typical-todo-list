import "@/styles/globals.css";
import type { AppProps } from "next/app";
import theme from "../utils/theme";

import { ChakraProvider } from "@chakra-ui/react";
import { trpc } from "@/utils/trpc";
import { Suspense } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>To-Do List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Suspense fallback={<h1 style={{ color: "red" }}>LOADING...</h1>}>
        <Component {...pageProps} />
      </Suspense>
    </ChakraProvider>
  );
}

export default trpc.withTRPC(MyApp);

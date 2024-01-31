// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";

function Upik({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default Upik;

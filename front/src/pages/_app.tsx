import { ChakraProvider } from "@chakra-ui/react"
import Layout from "./../components/Layout"
import theme from "../theme"
import { AppProps } from "next/app"
import React from "react"
import { UserProvider } from "../../context/User"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ChakraProvider>
  )
}

export default MyApp

//import React from "react"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import ContactUsForm from "./components/Contactform"

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({colors})

function App() {
  return(
    <ChakraProvider theme={theme}>
    <ContactUsForm/>
    </ChakraProvider>
  )
}

export default App

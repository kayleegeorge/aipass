import * as React from 'react'
import { Main } from "~components/main"

import { ChakraProvider } from '@chakra-ui/react'

function IndexPopup() {
  return (
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  )
}

export default IndexPopup
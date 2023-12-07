import { Box, Flex, Text } from "@chakra-ui/react";

function Footer() {
    return (
        <Flex position={'absolute'} bottom='0px' width={'100%'}>
          <Box backgroundColor={'#F0EAD6'} width={'100%'}>
            <Flex position={'absolute'} right='10px'>
              <Text fontSize={'14px'}>
              AI
              </Text>
              <Text fontWeight={'bold'} fontSize={'14px'}>
              PASS
              </Text> 
          </Flex>
          </Box>
        
        </Flex>
    )
}

export default Footer
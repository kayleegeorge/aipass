import { Flex, Box, Text } from "@chakra-ui/react";

function Key(props: {name: string, creditsLeft: string}) {
    return (

            <Box backgroundColor={'#E5DBD1'} width={'200px'} padding={'6px 12px'} borderRadius='md'>
            <Flex justifyContent='space-between' width={'100%'}>
                <Text fontWeight={'bold'}>
                 {props.name}
                </Text>
                <Text>
                    {`credits left: $${props.creditsLeft}`}
                </Text>
            </Flex>
            </Box>
        
    )
}

export default Key
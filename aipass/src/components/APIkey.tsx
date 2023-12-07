import { Box, Flex, Text } from "@chakra-ui/react"
import { Clipboard } from "@phosphor-icons/react";

function APIKey(props: {name: string, model: string, APIkey: string}) {
    const CopyKey = () => {
        navigator.clipboard.writeText(props.APIkey);
    }

    return (
        <Flex gap='6px' width={'100%'}>
            <Box backgroundColor={'#E5DBD1'} width={'100%'} padding={'6px 12px'} borderRadius='md'>
            <Flex justifyContent='space-between' width={'100%'} gap='20px'>
                <Text fontWeight={'bold'}>
                 {props.name}
                </Text>
                <Flex gap='12px'>
                    <Text fontStyle={'italic'}>
                        {props.model}
                    </Text>

                    <button onClick={CopyKey}>
                        <Clipboard color={'white'} />
                    </button>
                </Flex>
            </Flex>
            </Box>
        </Flex>
    )
}

export default APIKey
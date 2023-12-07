import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { Clipboard, PencilSimple } from "@phosphor-icons/react";

function Key(props: {name: string, creditsLeft: number, limit: boolean, key: string, edit?: boolean}) {

    const CopyKey = () => {
        navigator.clipboard.writeText(props.key);
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
                        {props.limit ? `credits left: $${props.creditsLeft}` : 'no limit'}
                    </Text>

                    <button onClick={CopyKey}>
                        <Clipboard color={'white'} />
                    </button>
                </Flex>
            </Flex>
            </Box>
            {!props.edit && (<Button size='sm' padding={'2px'}>
                <PencilSimple/>
            </Button>)}
            </Flex>
        
    )
}

export default Key
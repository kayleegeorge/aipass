import { Divider, Flex, Text } from "@chakra-ui/react"

function UsageInfo() {
    return (
        <>
        <Divider/>
        <Flex>
          <Flex flexDirection={'column'} gap='6px'>
            <Text fontSize={'14px'} fontWeight={'bold'}>USAGE INFO</Text>
            <Flex>
                <Text fontWeight={'bold'} width={'100px'}>{'Usage Rate:  '}</Text>
                    <Flex flexDirection={'column'}>
                        <Text>{' x1.02'}</Text> 
                        <Text fontStyle={'italic'} fontSize={'10px'}>{'(product adds 2% fee on top of base API costs)'}</Text>
                    </Flex>
            </Flex>
            <Flex>
                <Text fontWeight={'bold'} width={'100px'}>{'Spent to date: '}</Text>
                <Text>{'$40.05'}</Text>   
            </Flex>
          </Flex>
        </Flex>
        </>
    )
}

export default UsageInfo
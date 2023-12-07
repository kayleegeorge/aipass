import { Button, Divider, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react"
// import { Key } from "@phosphor-icons/react"
import Key from "./key"
import { useState } from "react"
import { retrieveAllKeys, storeNewKey } from "./store"
import { generateRandomKey } from "./utils"

// panel for managing key usage
function ManageKeys(props: {masterKey: string}) {

    const [newKey, setNewKey] = useState<string>('') 
    const [addNewKeyState, setAddNewKeyState] = useState<Boolean>(false)
    const handleNewKeyChange = (event) => setNewKey(event.target.value)

    const [newKeyApp, setNewKeyApp] = useState<string>('') 
    const handleNewKeyAppChange = (event) => setNewKeyApp(event.target.value)

    const [newKeyUsage, setNewKeyUsage] = useState<string>('') 
    const handleNewKeyUsageChange = (event) => setNewKeyUsage(event.target.value)  

    const [totalFunds, setTotalFunds] =useState(100) 
    const [fundsAllocated, setFundsAllocated] = useState(50)

    const [addFundsState, setAddFundsState] = useState<Boolean>(false)
    const [addFunds, setAddFunds] = useState('')
    const handleAddFunds = (event) => setAddFunds(event.target.value)
    const handleAddFundsTotal = () => {
        setTotalFunds(totalFunds + Number(addFunds))
        setAddFundsState(false)
    }

    const handleNewKeyEnter = () => {
        storeNewKey(props.masterKey, newKeyApp, newKey, 'model')
        setAddNewKeyState(false)
    }

    const handleGenerateNewKey = () => {
        const randomKey = generateRandomKey()
        setNewKey(randomKey)
      }

  
      const allKeys = retrieveAllKeys('klee')
        
    return (
        <>
      <Divider />
      <Flex flexDirection={'column'} gap='6px'>
        <Text fontSize={'14px'} fontWeight={'bold'}>MANAGE KEYS</Text>
            {Object.entries(allKeys).map(
                ([keyName, keyEntry]) => {
                    return <Key key={keyEntry['key']} name={keyName} limit = {keyEntry['limit']} creditsLeft={keyEntry['remaining_balance']} />
                } 
            )}
      </Flex>

      {/* <Flex>
      <Text fontWeight={'bold'}>{`Total funds: `}</Text><Text>{`$${totalFunds} ($${fundsAllocated} allocated)`}</Text>
      </Flex> */}
      

        <>
        <Flex gap='8px'>
        <Button size={'xs'} width= 'fit-content' backgroundColor={'#6982D8'} color={'white'} onClick={() => setAddNewKeyState(true)}>
          Add Key
        </Button>
        {/* <Button size={'xs'} width= 'fit-content'  backgroundColor={'#6982D8'} color={'white'} onClick={() => setAddFundsState(true)}>
          Manage Funds
        </Button> */}
        </Flex>
        {
          addFundsState && 
          <Flex gap ='8px'>
          <InputGroup>
                <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
                children='$'
              />
              <Input
                placeholder='enter amt to add'
                value={addFunds}
                onChange={handleAddFunds}
              />
              </InputGroup>
              <Button onClick={handleAddFundsTotal} colorScheme='orange'>
              Add Funds
            </Button> 
            </Flex>
        }
        { addNewKeyState &&
          (<>
          <Divider/>

          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              placeholder='enter new key'
              value={newKey}
              onChange={handleNewKeyChange}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' marginRight= '4px' onClick={handleGenerateNewKey}>
                Gen Key
              </Button>
            </InputRightElement>
          </InputGroup> 
              <Input
                pr='4.5rem'
                placeholder='new key app name'
                value={newKeyApp}
                onChange={handleNewKeyAppChange}
              />
              <InputGroup>
                <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
                children='$'
              />
              <Input
                placeholder='usage limit'
                value={newKeyUsage}
                onChange={handleNewKeyUsageChange}
              />
              </InputGroup>
              <Flex justifyContent={'space-between'}>
              <Button onClick={handleNewKeyEnter} colorScheme='orange' size={'xs'} >
                Enter New Key
              </Button>
              <Button onClick={() => setAddNewKeyState(false)} size={'xs'} variant={'outline'}>
                cancel
              </Button>
              </Flex>
              
          </>)
        }
        
        </>
        
        </>
    )
}
export default ManageKeys
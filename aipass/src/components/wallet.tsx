import { Button, Divider, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react"
import { retrieveAllPassKeys, storeNewKey } from "./store"
import APIKey from "./APIkey"
import { useEffect, useState } from "react"

function Wallet(props: {masterPassword: string}) {
    
    const [passes, setPasses] = useState({})
    const [addNewKeyState, setAddNewKeyState] = useState<boolean>(false)
    
    const [newKey, setNewKey] = useState<string>('') 
    const handleNewKeyChange = (event) => setNewKey(event.target.value)
    const [newApp, setAppKey] = useState<string>('') 
    const handleNewAppChange = (event) => setAppKey(event.target.value)
    const [newModel, setModelKey] = useState<string>('') 
    const handleNewModelChange = (event) => setModelKey(event.target.value)

    // useEffect(() => {
    //     const fetchPasses = async () => {
    //         const initialPasses = await retrieveAllPassKeys(props.masterPassword);
    //         setPasses(initialPasses);
    //     };
    //     fetchPasses();
    // }, []);

    const handleNewKeyEnter = async() => {
        storeNewKey(props.masterPassword, newApp, newKey, newModel)
        setAddNewKeyState(false)
        setPasses(await retrieveAllPassKeys(props.masterPassword))
    }

    return (
        <Flex flexDirection={'column'} gap='6px'>
        <Text fontSize={'14px'} fontWeight={'bold'}>ALL KEYS</Text>
            {Object.entries(passes).map(
                ([keyName, keyEntry]) => {
                    return <APIKey key= {keyName} name={keyName} model={keyEntry['model']} APIkey={keyEntry['key']}/>
                } 
            )}
            
        {!addNewKeyState && <Button size={'xs'} width= 'fit-content' backgroundColor={'#6982D8'} color={'white'} onClick={() => setAddNewKeyState(true)}>
          Add Key
        </Button> }

        { addNewKeyState &&
          (<>
          <Divider/>

            <Input
              pr='4.5rem'
              placeholder='new key'
              value={newKey}
              onChange={handleNewKeyChange}
            />
              <Input
                pr='4.5rem'
                placeholder='name/application'
                value={newApp}
                onChange={handleNewAppChange}
              />
            <Input
                pr='4.5rem'
                placeholder=' model'
                value={newModel}
                onChange={handleNewModelChange}
              />
            
              <Flex justifyContent={'space-between'}>
              <Button onClick={handleNewKeyEnter} backgroundColor={'#6982D8'} color='white' size={'xs'} >
                Enter New Key
              </Button>
              <Button onClick={() => setAddNewKeyState(false)} size={'xs'} variant={'outline'}>
                cancel
              </Button>
              </Flex>
              
          </>)
        }
      </Flex>
    )
}
export default Wallet
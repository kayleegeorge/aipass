import { useCallback, useEffect, useState } from "react"
import {Button, Checkbox, Divider, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Menu, Progress, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { generateRandomKey, hasAccount } from "./utils"
import CreateAccount from "./createAccount"
import Key from "./key"
import { Eye, EyeClosed } from "@phosphor-icons/react"
import ManageKeys from "./manageKeys"
import { DUMMY_DATA, loginWithMasterKey, retrieveAllPassKeys, storeNewKey } from "./store"
import UsageInfo from "./usageInfo"
import APIKey from "./APIkey"

export function Main() {
  
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const account = hasAccount()
  const [mk, setMK] = useState<string>('')
  const handleMKChange = (event) => setMK(event.target.value)
  const [masterPassword, setMasterPassword] = useState<string>('')

  const [usage, setUsage] = useState<boolean>(false)
  const [beta, setBeta] = useState<boolean>(false) // POC version

  // TODO automate whether has key
  const [hasKey, setHasKey] = useState<boolean>(true)
  const [show, setShow] = useState<boolean>(false)

  const [manage, setManage] = useState<boolean>(false)
  const [funds, setFunds] = useState<boolean>(false)

  // wallet
  const [passes, setPasses] = useState({})
  const [addNewKeyState, setAddNewKeyState] = useState<boolean>(false)
  
  const [newKey, setNewKey] = useState<string>('') 
  const handleNewKeyChange = (event) => setNewKey(event.target.value)
  const [newApp, setAppKey] = useState<string>('') 
  const handleNewAppChange = (event) => setAppKey(event.target.value)
  const [newModel, setModelKey] = useState<string>('') 
  const handleNewModelChange = (event) => setModelKey(event.target.value)

  const handleNewKeyEnter = async() => {
      await storeNewKey(masterPassword, newApp, newKey, newModel)
      setAddNewKeyState(false)
      setPasses(await retrieveAllPassKeys(masterPassword))
      setNewKey('')
      setAppKey('')
      setModelKey('')
  }

  let body

  // checks that masterkey matches on login
  const handleMKEnter = async () => {
    if (await loginWithMasterKey(mk)) {
      setLoggedIn(true)
      setMasterPassword(mk)
      setPasses(await retrieveAllPassKeys(mk))
    }
  }
  
  if (!account) {
    body = <CreateAccount/>
  }
  
  // login panel --> get masterkey
  else if (!loggedIn) {
    body = (
      <>
      <Flex justifyContent={'space-between'}>
      <Text fontSize={'16px'} fontWeight={'bold'}>Login</Text>
      <Checkbox colorScheme={'gray'} color={'gray'}
          isChecked={beta}
          onChange={(e) => setBeta(e.target.checked)}
        >
         POC 
        </Checkbox>
        </Flex>

          <form
                onSubmit={e=> {
                    e.preventDefault();
                    handleMKEnter()
                }}>
                  <Flex flexDirection={'row'} gap='8px'>
                  
                <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter Master Password'
                value={mk}
                onChange={handleMKChange}
              />
      
              <InputRightElement >
                <Button h='1.75rem' size='sm' marginRight='6px' onClick={() => setShow(!show)}>
                {show ? <EyeClosed/> : <Eye/>}
                </Button>
              </InputRightElement>
            </InputGroup>

                <Button type="submit" backgroundColor={'#6982D8'} color='white'>Enter</Button>
                </Flex>
                </form>
            </>
        )
  }

  else if (!beta && loggedIn) {
    body = (
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
  // correct masterkey input
  else {
    const getKey = DUMMY_DATA['klee']['keys']['test']

    body = (
      <>
      {hasKey && <Flex gap = '4px' flexDirection={'column'}>
        {/* <Flex gap ='4px'><Text fontWeight={'bold'} fontSize={'14px'}>{`Current App: `}</Text><Text fontSize={'14px'}>tldr</Text></Flex> */}
      
        <Flex gap = '4px' flexDirection={'column'}>
          <Flex gap='4px'><Text fontWeight={'bold'} fontSize={'14px'}>App: </Text><Text fontSize={'14px'}>claudered</Text></Flex> 
          <Flex gap='4px'><Text fontWeight={'bold'} fontSize={'14px'}>Key: </Text><Key name= {'test'} creditsLeft={getKey['remaining_balance']} key={getKey['key']}  limit={getKey['limit']} edit={true} /></Flex>
        </Flex>
        
      </Flex>}

      {!hasKey && <Flex gap = '4px' flexDirection={'column'} fontSize={'14px'}>
        <Text fontWeight={'bold'}>No AI Key detected for Current AI App</Text>
        
        <Button size ='xs' width = 'fit-content' colorScheme={'orange'}>
         Generate AI App Key 
        </Button>
      </Flex>}
      
      <>
      <Flex gap='8px'>
       <Button  onClick={() => setUsage(!usage)} size ='xs' width = 'fit-content' >
        Usage Info
      </Button> 

      <Button  onClick={() => setManage(!manage)} size ='xs' width = 'fit-content' >
        Manage Keys
      </Button>

      <Button  onClick={() => setFunds(!funds)} size ='xs' width = 'fit-content' >
        Manage Funds
      </Button> 

      </Flex>
      </>

      {usage && <UsageInfo/>}
      {manage && <ManageKeys masterKey={mk}/>}
      
      </>
    )

  
  }


    return(
      <>
     
      <Flex flexDirection={'column'} width={'400px'} height='fit-content' padding={'20px'} gap='12px'>
            {body}
            
      </Flex> 
      {/* <Footer/>  */}
      </>
    )

}

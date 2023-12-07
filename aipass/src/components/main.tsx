import { useEffect, useState } from "react"
import {Button, CircularProgress, Divider, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Menu, Progress, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { generateRandomKey, hasAccount } from "./utils"
import CreateAccount from "./createAccount"
import Key from "./key"
import * as crypto from "crypto"
import { Eye, EyeClosed } from "@phosphor-icons/react"
import ManageKeys from "./manageKeys"
import { DUMMY_DATA } from "./store"
import UsageInfo from "./usageInfo"

export function Main() {
  
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [masterKey, setMasterKey] = useState<string>('')
  const account = hasAccount()
  const [mk, setMK] = useState<string>('')
  const handleMKChange = (event) => setMK(event.target.value)
  const localStorageMK = localStorage.getItem('aiPassMasterKey')
  const hash = crypto.createHash('sha256')

  const [usage, setUsage] = useState<boolean>(false)

  // TODO automate this
  const [hasKey, setHasKey] = useState<boolean>(true)
  const [show, setShow] = useState<boolean>(false)

  const [manage, setManage] = useState<boolean>(false)
  const [funds, setFunds] = useState<boolean>(false)
  
  let body;

  // checks that masterkey matches on login
  const handleMKEnter = () => {
    const hashedMK = hash.update(mk).digest('hex') 
    if (hashedMK == localStorageMK) {
      setLoggedIn(true)
      setMasterKey(mk)
    }
  }
  
  if (!account) {
    body = <CreateAccount/>
  }
  
  // login panel --> get masterkey
  else if (!loggedIn) {
    body = (
      <>
      <Text fontSize={'16px'} fontWeight={'bold'}>Login</Text>
          <form
                onSubmit={e=> {
                    e.preventDefault();
                    handleMKEnter()
                    // location.assign('?wd=' + mk)
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
      {manage && <ManageKeys masterKey={masterKey}/>}
      
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

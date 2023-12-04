import { useEffect, useState } from "react"
import {Button, CircularProgress, Divider, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Progress, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { generateRandomKey, hasAccount } from "./utils"
import CreateAccount from "./createAccount"
import Key from "./key"
import * as crypto from "crypto"
import { retrieveAll, storeNewApp } from "./store"

export function Main() {
  
  const [loggedIn, setLoggedIn] = useState<Boolean>(false)
  const [masterKey, setMasterKey] = useState<string>('')
  const account = hasAccount()
  const [mk, setMK] = useState<string>('')
  const handleMKChange = (event) => setMK(event.target.value)
  const localStorageMK = localStorage.getItem('aiPassMasterKey')
  const hash = crypto.createHash('sha256')

  const [newKey, setNewKey] = useState<string>('') 
  const [addNewKeyState, setAddNewKeyState] = useState<Boolean>(false)
  const handleNewKeyChange = (event) => setNewKey(event.target.value)

  const [newKeyApp, setNewKeyApp] = useState<string>('') 
  const handleNewKeyAppChange = (event) => setNewKeyApp(event.target.value)

  const [newKeyUsage, setNewKeyUsage] = useState<string>('') 
  const handleNewKeyUsageChange = (event) => setNewKeyUsage(event.target.value)  

  const handleNewKeyEnter = () => {
    storeNewApp(masterKey, newKeyApp, newKey, newKeyUsage)
    setAddNewKeyState(false)
  }

  // TODO automate this
  const [hasKey, setHasKey] = useState<Boolean>(true)

  const [totalFunds, setTotalFunds] =useState(100) 
  const [fundsAllocated, setFundsAllocated] = useState(50)

  const [addFundsState, setAddFundsState] = useState<Boolean>(false)
  const [addFunds, setAddFunds] = useState('')
  const handleAddFunds = (event) => setAddFunds(event.target.value)
  const handleAddFundsTotal = () => {
    setTotalFunds(totalFunds + Number(addFunds))
    setAddFundsState(false)
  }

  const [manage, setManage] = useState<Boolean>(false)
  
  let body;


  const handleGenerateNewKey = () => {
    const randomKey = generateRandomKey(60)
    setNewKey(randomKey)
  }

  // check that masterkeys match
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

  else if (!loggedIn) {
    body = (
      <>
          <Text fontSize={'20px'}>Login</Text>
      
              <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={'password'}
                placeholder='Enter Master Password'
                value={mk}
                onChange={handleMKChange}
              />
      
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleMKEnter}>
                  {'Enter'}
                </Button>
              </InputRightElement>
            </InputGroup>
            </>
        )
  }
  // has keys
  else {
  //  const allKeys = retrieveAll() 
  //  console.log(allKeys)

    const manageBody = (
      <>
      <Divider />

      <Flex flexDirection={'column'} gap='4px'>
        <Text fontSize={'14px'} >MANAGE KEYS</Text>
        <Key key= 'hi' name="tldraw" creditsLeft="20"/>
        <Key key= 'hi2'  name="app#2" creditsLeft="20"/>
        <Key key= 'hi1'  name="test" creditsLeft="10"/>
      </Flex>

      <Flex>
      <Text fontWeight={'bold'}>{`Total funds: $${totalFunds} ($${fundsAllocated} allocated)`}</Text>
      </Flex>
      

        <>
        <Flex gap='8px'>
        <Button size={'xs'} width= 'fit-content' colorScheme='orange' variant='outline' onClick={() => setAddNewKeyState(true)}>
          Add Key
        </Button>
        <Button size={'xs'} width= 'fit-content' colorScheme='orange' variant='outline' onClick={() => setAddFundsState(true)}>
          Add Funds
        </Button>
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
      <Button onClick={() => setManage(false)} size ='xs' width = 'fit-content' position={'absolute'} right='10px' bottom={'10px'}>
        close
        </Button>
        
        </>
        
        </>
    )


    body = (
      <>
      {hasKey && <Flex gap = '4px' flexDirection={'column'}>
        {/* <Flex gap ='4px'><Text fontWeight={'bold'} fontSize={'14px'}>{`Current App: `}</Text><Text fontSize={'14px'}>tldr</Text></Flex> */}
      
        <Flex gap = '4px'>
          <Text fontWeight={'bold'} fontSize={'14px'}>Current Key: </Text><Key name='tldr' creditsLeft='20'/>
        </Flex>
        
      </Flex>}

      {!hasKey && <Flex gap = '4px' flexDirection={'column'} fontSize={'14px'}>
        <Text fontWeight={'bold'}>No AI Key detected for Current AI App</Text>
        
        <Button size ='xs' width = 'fit-content' colorScheme={'orange'}>
         Generate AI App Key 
        </Button>
      </Flex>}
      
      {!manage && <Button onClick={() => setManage(true)} size ='xs' width = 'fit-content'>
        Manage Keys
      </Button>}

      
      {manage && manageBody}
      
      </>
    )

  
  }


    return(
      <>
      <Flex position={'absolute'} top='10px' right={'10px'}>
      <Text color={'orange'} fontWeight={'bold'} fontSize={'14px'}>
        AI
        </Text>
        <Text fontWeight={'bold'} fontSize={'14px'}>
        PASS
        </Text> 
      </Flex>

      <Flex flexDirection={'column'} width={'400px'} height='fit-content' padding={'20px'} gap='12px'>
            {body}
          </Flex> 
      
      </>
    )

}

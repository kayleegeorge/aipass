import { Button, Flex, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react"
import * as crypto from "crypto"
import { setMasterKey } from "./store";

function CreateAccount() {
    const [show, setShow] = useState<Boolean>(false)
    const handleClick = () => setShow(!show)
    const [mk, setMK] = useState<string>('')
    const handleMKChange = (event) => setMK(event.target.value)

    const handleMasterKey= () => {
        setMasterKey(mk)
    }
  
    return (
        <Flex flexDirection={'column'} gap='12px'>
            <Text fontSize={'16px'}>Create aiPass master key</Text>
            <Flex flexDirection={'column'} gap='12px' alignItems={'center'}>
            <InputGroup size='md'>
                <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='enter key'
                value={mk}
                onChange={handleMKChange}
                />
                <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
                </InputRightElement>
            </InputGroup>
            <Button onClick={handleMasterKey} size={'sm'} width={'fit-content'}>
                Create Master Key
            </Button>
            </Flex>
        </Flex>
    )
  }

export default CreateAccount
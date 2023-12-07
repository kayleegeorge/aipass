import { Button, Flex, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react"
import * as crypto from "crypto"
import { setMasterKey } from "./store";
import { EyeClosed, Eye } from "@phosphor-icons/react";

function CreateAccount() {
    const [show, setShow] = useState<Boolean>(false)
    const [mk, setMK] = useState<string>('')
    const handleMKChange = (event) => setMK(event.target.value)
    const [showSuccess, setShowSuccess] = useState<Boolean>(false)
    const [signup, setSignup] = useState<Boolean>(true)

    const handleMasterKey= () => {
        setSignup(false)
        if (setMasterKey(mk)) {
            setShowSuccess(true)
            
        }
    }
  
    return (
        <>
        {!signup && showSuccess && (
            <Flex flexDirection={'column'} fontSize={'16px'} alignContent={'center'}>
                <Text fontWeight={'bold'}>Master Key created successfully!</Text>
                <Text>re-open AIPass to login</Text>
            </Flex>
        )}
        
        {signup && (<Flex flexDirection={'column'} gap='12px'>
            <Text fontSize={'16px'} fontWeight={'bold'}>Create aiPass master key</Text>
            
            <form
                onSubmit={e=> {
                    e.preventDefault();
                    handleMasterKey()
                    // location.assign('?wd=' + mk)
                }}>
            <Flex flexDirection={'row'} gap='4px'>
            <InputGroup size='md'>
                <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='enter master key'
                value={mk}
                onChange={handleMKChange}
                />
                <InputRightElement marginRight={'4px'}>
                <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                {show ? <EyeClosed/> : <Eye/>}
                </Button>
                </InputRightElement>
            </InputGroup>
            <Button onClick={handleMasterKey} width={'fit-content'} backgroundColor={'#6982D8'} color='white'>
                Set 
            </Button>
            </Flex>
            </form>
            
        </Flex>)}
        </>
    )
  }

export default CreateAccount
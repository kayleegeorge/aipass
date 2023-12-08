import * as crypto from "crypto" 
const { subtle } = globalThis.crypto;
import { stringToByteArray, byteArrayToString, untypedToTypedArray, bufferToUntypedArray } from "./libUtils";
import { generateRandomKey } from "./utils";

const MAX_PASS_LENGTH = 64;
const VERIFICATION_MESSAGE = 'storedemkeez';
const PBKDF2_ITERATIONS = 10000;
const iv = stringToByteArray('thisshouldalsobearandomiv')

// util for generating and storing
function getSalt() {
    if (!localStorage.getItem('salt')) {
        localStorage.setItem('salt', generateRandomKey(16))
    }
    return stringToByteArray(localStorage.getItem('salt'))
}

// util for padding password
function padPassword(masterPassword: string) {
    let paddedPassword = masterPassword
    if (paddedPassword.length < MAX_PASS_LENGTH) {
        paddedPassword += "1" + "0".repeat(MAX_PASS_LENGTH - paddedPassword.length - 1) 
    }
    return paddedPassword
}

// derive masterkey from master password
async function deriveMasterKey(paddedPassword: string) {
    const passwordKey = await subtle.importKey("raw", stringToByteArray(paddedPassword), {name: "PBKDF2"}, false, ["deriveKey"])
    const algorithm = {name: "PBKDF2", salt: getSalt(), iterations: PBKDF2_ITERATIONS, hash: 'SHA-256'}
    const masterKey = await subtle.deriveKey(algorithm, passwordKey, {name: "HMAC", hash: 'SHA-256', length: 256}, false, ["sign", "verify"])
    return masterKey
}

// INIT: create master key and set in localstorage
export async function setMasterKey(masterPassword: string) {
    const buffedPassword = padPassword(masterPassword)
    const masterKey = await deriveMasterKey(buffedPassword)
    const passwordSignature = bufferToUntypedArray(await subtle.sign("HMAC", masterKey, stringToByteArray(VERIFICATION_MESSAGE)))
    const passwordSignatureString = passwordSignature.toString()
    localStorage.setItem('aiPassMasterSignature', passwordSignatureString)

    localStorage.setItem('aiPasses', "[]") 
    
    if (localStorage.getItem('aiPassMasterSignature') == passwordSignatureString) {
        return passwordSignatureString
    }
    return false
}

// check password matches masterkey: return true if matching, false otherwise
export async function loginWithMasterKey(passwordPrime: string) {
    const passwordSignature = localStorage.getItem('aiPassMasterSignature')
    const formattedSig = JSON.parse("[" + passwordSignature + "]")

    // recreate password with attempted passwrod
    const buffedPassword = padPassword(passwordPrime)
    const masterPrimeKey = await deriveMasterKey(buffedPassword)
    const matching = await subtle.verify("HMAC", masterPrimeKey, untypedToTypedArray(formattedSig), stringToByteArray(VERIFICATION_MESSAGE))
    return matching
}

// derive AES, HMAC keys from masterpassword
export async function deriveSecretKeys(masterPassword: string) {
    const paddedPassword = padPassword(masterPassword)
    const masterKey = await deriveMasterKey(paddedPassword)
    
    const keyNameRandomBytes = await subtle.digest('SHA-256', stringToByteArray(paddedPassword + getSalt() + '0'))
    const keyRandomBytes = await subtle.digest('SHA-256', stringToByteArray(paddedPassword + getSalt() + '1'))

    const domainKeySignature = await subtle.sign("HMAC", masterKey, keyNameRandomBytes)
    const passwordKeySignature = await subtle.sign("HMAC", masterKey, keyRandomBytes)

    // HMAC (domain) and AES (password) keys
    const HMACKey = await subtle.importKey("raw", domainKeySignature, {name: "HMAC", hash: 'SHA-256', length: 256}, false, ["sign", "verify"])
    const AESKey = await subtle.importKey("raw", passwordKeySignature, {name: "AES-GCM", length: 256}, false, ["encrypt", "decrypt"])
    return {'HMAC': HMACKey, 'AES': AESKey}
}
 
// store a key, encrypted with the masterkey (null IV for now)
// didn't pad keyinfo because lazy
export async function storeNewKey(masterPassword: string, applicationName: string, applicationKey: string, model: string) {
    const keys = await deriveSecretKeys(masterPassword)
    const signedName = bufferToUntypedArray(await subtle.sign("HMAC", keys['HMAC'], stringToByteArray(applicationName)))
    const encryptedKeyInfo = bufferToUntypedArray(await subtle.encrypt({ name: "AES-GCM", iv: iv}, keys['AES'], stringToByteArray(applicationKey)))
    localStorage.setItem(signedName.toString(), encryptedKeyInfo.toString())

    // store names and models in plaintext lol
    const passes = JSON.parse(localStorage.getItem('aiPasses'))
    passes.push(applicationName)
    passes.push(model)
    localStorage.setItem('aiPasses', JSON.stringify(passes))
}

// return key
export async function retrieveKey(masterPassword: string, keyName: string) {
    const keys = await deriveSecretKeys(masterPassword)
    const signedName = bufferToUntypedArray(await subtle.sign("HMAC", keys['HMAC'], stringToByteArray(keyName))).toString()
    const encryptedKey = localStorage.getItem(signedName)
    const formattedEncKey = JSON.parse("[" + encryptedKey + "]")
    return byteArrayToString(await subtle.decrypt({ name: "AES-GCM", iv: iv}, keys['AES'], untypedToTypedArray(formattedEncKey)))
    // return decryptedKey
}

// gets all passes
export async function retrieveAllPassKeys(masterPassword: string) {
    let passes = {}
    const passNames = JSON.parse(localStorage.getItem('aiPasses'))
    console.log(passNames)
    for (let i = 0; i < passNames.length; i+=2) {
        passes[passNames[i]] = {
            'key': await retrieveKey(masterPassword, passNames[i]),
            'model': passNames[i+1]
        }
    }
    return passes
}


// ----------------------------------- FAKE APIs -----------------------------------------//

// EXAMPLE of key data
export const DUMMY_DATA = {
    'klee': {
        'keys': {
            // for my test application
            'test': 
                {'key': 'sk-sUJr2tcxUJOyf25i13RpZFFQDYg4Vj6CQICJ6g1NhXyNyzSm3fVh9X5dgRcitB0l',
                'remaining_balance': 40, // will only allow me to spend balance
                'limit': true // limit enforced
                },
            // for a product i like to play with
            'tldraw': 
                {'key': 'sk-DOC1WKiCPdWqHMGtT09dQCx8nVNDsOr5iCFdgCC6VGIpG3T7WieIE8Aj4zoJszVx',
                'remaining_balance': 20,
                'limit': true
                },
            // for my mom to use 
            'mom': 
                {'key': 'sk-xg3PuL48ilfR0oOtGGxAFG79sJWnT6u5HCaUcLVpyBkpUOEDzbwzIq2LflkYPk9Q',
                'remaining_balance': 40, 
                'limit': true
                },
            // for cursor
            'code': 
                {'key': 'sk-LBq7Ou0hjpPx4fSsUHnyvBWx6ZtGqi61YO70uGSI4stb0gHckuaiGJW4U0WUhJwG',
                'remaining_balance': 0, // no balance to begin with
                'limit': false // unlimited, charges automatically to my card
                }
        },
        'paymentInfo': '[insert credit card info]',
        'totalBalance': 1000
    }

}
/*
    input: key, account credentials
    output: how much balance I have for this key
*/
export function retrieveRemainingBalanceForKey(account: string, keyName: string) {
    return DUMMY_DATA[account]['keys'][keyName]['remaining_balance']
}

/*
    input: account credentials
    output: all keys associated with this account
*/
export function retrieveAllKeys(account: string) {
    return DUMMY_DATA[account]['keys']
}


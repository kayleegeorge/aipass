import * as cryptoJS from "crypto-js"
import * as crypto from "crypto"
 
// store a key, encrypted with the masterkey (null IV for now)
export function storeNewKey(masterKey: string, applicationName: string, applicationKey: string, usageLimit: string) {
    const encryptedAppKey = cryptoJS.AES.encrypt(applicationKey, masterKey).toString()
    const appKeyStore = `aiPass${applicationName}`
    localStorage.setItem(appKeyStore, encryptedAppKey)
    
    if (localStorage.getItem(appKeyStore) == encryptedAppKey) {
        return true
    }
    return false
}

// retrieve application specific key from localstorage
export function retrieveKey(masterKey: string, keyName: string) {
    const appKeyStore = `aiPass${keyName}`
    const encryptedKey = localStorage.getItem(appKeyStore)
    const decryptedAppKey = cryptoJS.AES.decrypt(encryptedKey, masterKey).toString()
    return decryptedAppKey
}

// create master key and set in localstorage
export function setMasterKey(masterKey: string): boolean {
    const hash = crypto.createHash('sha256')
    const encryptedMasterKey = hash.update(masterKey).digest('hex')
    localStorage.setItem('aiPassMasterKey', encryptedMasterKey)
    const aiPasses = []
    localStorage.setItem('aiPasses', JSON.stringify(aiPasses))
    
    if (localStorage.getItem('aiPassMasterKey') == encryptedMasterKey) {
        return true
    }
    return false
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


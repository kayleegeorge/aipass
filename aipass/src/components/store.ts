import * as cryptoJS from "crypto-js"
import * as crypto from "crypto"
 
// store a key, encrypted with the masterkey, null IV for now
export function storeNewApp(masterKey: string, applicationName: string, applicationKey: string, usageLimit: string) {
    const encryptedAppKey = cryptoJS.AES.encrypt(applicationKey, masterKey).toString()
    const appKeyStore = `aiPass${applicationName}`
    console.log(encryptedAppKey)
    localStorage.setItem(appKeyStore, encryptedAppKey)
    
    const aiPasses = JSON.parse(localStorage.getItem('aiPasses')) 
    aiPasses.push(applicationName)
    aiPasses.push(usageLimit)
    localStorage.setItem('aiPasses', JSON.stringify(aiPasses))
}

// retrieve application specific key
export function retrieveApp(masterKey: string, applicationName: string) {
    const appKeyStore = `aiPass${applicationName}`
    const encryptedKey = localStorage.getItem(appKeyStore)
    const decryptedAppKey = cryptoJS.AES.decrypt(encryptedKey, masterKey).toString()
    return decryptedAppKey
}

// created master key
export function setMasterKey(masterKey: string) {
    const hash = crypto.createHash('sha256')
    const encryptedMasterKey = hash.update(masterKey).digest('hex')
    localStorage.setItem('aiPassMasterKey', encryptedMasterKey)
    const aiPasses = []
    localStorage.setItem('aiPasses', JSON.stringify(aiPasses))
}

export function retrieveAll() {
    const aiPasses = JSON.parse(localStorage.getItem('aiPasses'))
    if (!aiPasses) return {}
    let allPasses = {}
    for (let i = 0; i < aiPasses.length; i+2) {
        allPasses[aiPasses[i]] = aiPasses[i + 1]
    }
    return allPasses
}
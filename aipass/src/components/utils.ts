export function hasAccount() {
    const masterKey = localStorage.getItem('aiPassMasterSignature')
    if (!masterKey) return false
    return true
}
export function getMasterKey() {
    const account = hasAccount()
    if (!account) return ''
    return localStorage.getItem('aiPassMasterSignature')
}

export function generateRandomKey(length: number = 64) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomKey = '';
    for (var i = 0; i < length; i++) {
      var randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
      randomKey += randomCharacter;
    }
    return 'sk-' + randomKey;
  }
import Blowfish from 'blowfish-node'

export default function encryptPassword (password: string, passwordEncryptionKey: string): string {
  const bf = new Blowfish(passwordEncryptionKey, Blowfish.MODE.ECB)
  return bf.encodeToBase64(password)
}

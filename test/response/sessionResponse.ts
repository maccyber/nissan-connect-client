import { type ISessionResponse } from '../../src/nissan-connect/types'

export default function ({ status = 200, message = 'success', baseprm = 'baseprm' }): ISessionResponse {
  return {
    status,
    message,
    baseprm
  }
}

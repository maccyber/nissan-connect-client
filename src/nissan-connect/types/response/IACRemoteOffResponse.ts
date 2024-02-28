export interface IACRemoteOffResponse {
  status: number
  message: string
  responseFlag: string
  operationResult: string
  timeStamp: string
  hvacStatus: 'OFF' | 'ON'
}

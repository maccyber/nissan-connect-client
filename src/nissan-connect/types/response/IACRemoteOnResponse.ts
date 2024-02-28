export interface IACRemoteOnResponse {
  status: number
  message: string
  responseFlag: string
  operationResult: string
  acContinueTime: number
  cruisingRangeAcOn: number
  cruisingRangeAcOff: number
  timeStamp: string
  hvacStatus: 'OFF' | 'ON'
}

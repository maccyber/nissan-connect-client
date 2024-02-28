export interface IClientVehicle {
  nickname: string
  vin: string
  customSessionId: string
  dcmId: string
  timezone: string
  regionCode: string
  locale: string
}

export type IClientVehicles = IClientVehicle[]

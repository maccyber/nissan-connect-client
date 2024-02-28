export interface IVehicleResponse {
  status: number
  sessionId?: string
  VehicleInfoList: {
    VehicleInfo?: IVehicleInfo[]
    vehicleInfo?: IVehicleInfo[]
  }
  vehicle: {
    profile?: IVehicleProfile
  }
  EncAuthToken?: string
  CustomerInfo: ICustomerInfo
  UserInfoRevisionNo?: string
  ngTapUpdatebtn?: string
  timeoutUpdateAnime?: string
  G1Lw?: string
  G1Li?: string
  G1Lt?: string
  G1Uw?: string
  G1Ui?: string
  G1Ut?: string
  G2Lw?: string
  G2Li?: string
  G2Lt?: string
  G2Uw?: string
  G2Ui?: string
  G2Ut?: string
  resultKey?: string
}

export interface IVehicleInfo {
  nickname: string
  telematicsEnabled?: string
  vin?: string
  custom_sessionid?: string
}

interface IVehicleProfile {
  vin: string
  gdcUserId?: string
  gdcPassword?: string
  encAuthToken?: string
  dcmId?: string
  nickname: string
  modelyear: string
}

interface ICustomerInfo {
  UserId?: string
  Language?: string
  Timezone?: string
  RegionCode?: string
  OwnerId?: string
  EMailAddress?: string
  Nickname?: string
  Country?: string
  VehicleImage?: string
  UserVehicleBoundDurationSec?: string
  VehicleInfo?: {
    VIN?: string
    DCMID?: string
    SIMID?: string
    NAVIID?: string
    EncryptedNAVIID?: string
    MSN?: string
    LastVehicleLoginTime?: string
    UserVehicleBoundTime?: string
    LastDCMUseTime?: string
    NonaviFlg?: string
    CarName?: string
    CarImage?: string
  }
}

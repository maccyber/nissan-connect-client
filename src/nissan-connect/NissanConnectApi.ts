import { type AxiosResponse, type AxiosInstance } from 'axios'

import {
  type RegionCode,
  type ISessionResponse,
  type IVehicleResponse,
  type IStatusResponse,
  type IRequestParameters,
  type IRequestOperationParameters,
  type ILoginRequestParameters,
  type IConnectRequestParameters,
  type IBatteryStatusRecordsResponse,
  type IACRemoteOffResponse,
  type IRemoteACRecordsResponse,
  type IBatteryRemoteChargingResponse
} from './types'
import ApiPaths from './ApiPaths'
import logger from '../lib/utils'
import encryptPassword from '../lib/encrypt-password'
import createAxiosApiInstance from '../lib/axios-api-instance'

interface INissanConnectApiOptions {
  debug: boolean
  regionCode: RegionCode
  locale: string
  initialAppString: string
  apiEndpoint: URL
}

export interface INissanConnectApiOperations {
  batteryStatusCheckRequest: (parameters: IRequestOperationParameters) => Promise<AxiosResponse<IStatusResponse>>
  batteryStatusRecordsRequest: (parameters: IRequestOperationParameters) => Promise<AxiosResponse<IBatteryStatusRecordsResponse>>
  remoteACRecordsRequest: (parameters: IRequestOperationParameters) => Promise<AxiosResponse<IRemoteACRecordsResponse>>
  acRemoteRequest: (parameters: IRequestOperationParameters) => Promise<AxiosResponse<IBatteryStatusRecordsResponse>>
  acRemoteOffRequest: (parameters: IRequestOperationParameters) => Promise<AxiosResponse<IACRemoteOffResponse>>
  batteryRemoteChargingRequest: (parameters: IRequestOperationParameters) => Promise<AxiosResponse<IBatteryRemoteChargingResponse>>
}

interface INissanConnectApi extends INissanConnectApiOperations {
  connect: () => Promise<AxiosResponse<ISessionResponse>>
  login: (userid: string, password: string, baseParam: string) => Promise<AxiosResponse<IVehicleResponse>>
}
export class NissanConnectApi implements INissanConnectApi {
  private readonly apiInstance: AxiosInstance

  constructor (private readonly options: INissanConnectApiOptions) {
    this.apiInstance = createAxiosApiInstance(options.apiEndpoint, logger(options.debug))
  }

  async connect (): Promise<AxiosResponse<ISessionResponse>> {
    const connectRequestParameters: IConnectRequestParameters = {
      initial_app_str: this.options.initialAppString,
      RegionCode: this.options.regionCode,
      lg: this.options.locale
    }
    return await this.makeRequest(
      ApiPaths.initialApp,
      connectRequestParameters
    )
  }

  async login (userid: string, password: string, baseParam: string): Promise<AxiosResponse<IVehicleResponse>> {
    const loginRequestParameters: ILoginRequestParameters = {
      UserId: userid,
      Password: encryptPassword(password, baseParam),
      initial_app_str: this.options.initialAppString,
      RegionCode: this.options.regionCode,
      lg: this.options.locale
    }
    return await this.makeRequest(
      ApiPaths.userLoginRequest,
      loginRequestParameters
    )
  }

  async batteryStatusCheckRequest (parameters: IRequestOperationParameters): Promise<AxiosResponse<IStatusResponse>> {
    return await this.makeRequest<IStatusResponse>(ApiPaths.batteryStatusCheckRequest, parameters)
  }

  async batteryStatusRecordsRequest (parameters: IRequestOperationParameters): Promise<AxiosResponse<IBatteryStatusRecordsResponse>> {
    return await this.makeRequest<IBatteryStatusRecordsResponse>(ApiPaths.batteryStatusRecordsRequest, parameters)
  }

  async remoteACRecordsRequest (parameters: IRequestOperationParameters): Promise<AxiosResponse<IRemoteACRecordsResponse>> {
    return await this.makeRequest<IRemoteACRecordsResponse>(ApiPaths.remoteACRecordsRequest, parameters)
  }

  async acRemoteRequest (parameters: IRequestOperationParameters): Promise<AxiosResponse<IBatteryStatusRecordsResponse>> {
    return await this.makeRequest<IBatteryStatusRecordsResponse>(ApiPaths.acRemoteRequest, parameters)
  }

  async acRemoteOffRequest (parameters: IRequestOperationParameters): Promise<AxiosResponse<IACRemoteOffResponse>> {
    return await this.makeRequest<IACRemoteOffResponse>(ApiPaths.remoteACRecordsRequest, parameters)
  }

  async batteryRemoteChargingRequest (parameters: IRequestOperationParameters): Promise<AxiosResponse<IBatteryRemoteChargingResponse>> {
    return await this.makeRequest<IBatteryRemoteChargingResponse>(ApiPaths.batteryRemoteChargingRequest, parameters)
  }

  private async makeRequest<T>(url: string, data: IRequestParameters): Promise<AxiosResponse<T>> {
    return await this.apiInstance({ url, data })
  }
}

import { AxiosResponse } from 'axios'

import { NissanConnectApi, INissanConnectApiOperations } from './nissan-connect/NissanConnectApi';
import { DEFAULT_API_ENDPOINT, DEFAULT_INITIAL_APP_STR, DEFAULT_LOCALE } from './nissan-connect/defaults'
import { NissanConnectError } from './errors'
import {
  IClientVehicles,
  IClientVehiclesResponse,
  IClientBatteryCheckResponse,
  IClientBatteryStatusResponse,
  IClientClimateControlTurnOnResponse,
  IClientClimateControlTurnOffResponse,
  IClientClimateControlStatusResponse,
  IClientCharingStartResponse
} from './types'

import {
  IRegion,
  RegionCode,
  IRequestOperationParameters,
  IStatusResponse,
  IBatteryStatusRecordsResponse,
  IRemoteACRecordsResponse,
  IACRemoteOnResponse,
  IACRemoteOffResponse,
  IBatteryRemoteChargingResponse
} from './nissan-connect/types'

import {
  mapVehicleResponse,
  mapBatteryStatusRecordsResponse,
  mapClimateControlStatusResponse,
  mapClimateControlTurnOnResponse,
  mapClimateControlTurnOffResponse,
  mapChargingStartResponse,
  mapStatusResponse,
} from './mappers'

interface INissanConnectClient {
  login(userid: string, password: string): Promise<IClientVehiclesResponse>
  refreshBatteryStatus(vin: string): Promise<IClientBatteryCheckResponse>
  batteryStatus(vin: string): Promise<IClientBatteryStatusResponse>
  climateControlStatus(vin: string): Promise<IClientClimateControlStatusResponse>
  climateControlTurnOn(vin: string): Promise<IClientClimateControlTurnOnResponse>
  climateControlTurnOff(vin: string): Promise<IClientClimateControlTurnOffResponse>
  chargingStart(vin: string): Promise<IClientCharingStartResponse>
}

export class NissanConnectClient implements INissanConnectClient {
  private apiInstance: NissanConnectApi;
  private isConnected: boolean = false;
  private isLoggedIn: boolean = false;
  private vehicle: IClientVehicles | null = null;

  constructor(
    {
      regionCode = RegionCode.Europe,
      locale = DEFAULT_LOCALE,
      apiEndpoint = DEFAULT_API_ENDPOINT,
      debug = false
    }: {
      regionCode?: IRegion,
      locale?: string,
      apiEndpoint?: URL,
      debug?: boolean
    }
  ) {
    const initialAppString = DEFAULT_INITIAL_APP_STR;
    this.apiInstance = new NissanConnectApi({ debug, regionCode, locale, initialAppString, apiEndpoint })
  }

  async login(userid: string, password: string): Promise<IClientVehiclesResponse> {
    try {
      const connectResponse = await this.apiInstance.connect()
      if (connectResponse.data.status !== 200 || !connectResponse.data.baseprm) {
        throw new NissanConnectError({ name: 'NotConnectedError', message: 'Failed to connect', cause: connectResponse.data })
      }
      const { data: { baseprm } } = connectResponse
      this.isConnected = true

      const loginResponse = await this.apiInstance.login(userid, password, baseprm)
      if (loginResponse.data.status !== 200) {
        throw new NissanConnectError({ name: 'NotLoggedInError', message: 'Failed to login', cause: loginResponse.data })
      }
      this.isLoggedIn = true

      const vehicleInfo = mapVehicleResponse(loginResponse.data)
      if (!vehicleInfo) {
        throw new NissanConnectError({ name: 'VehicleInfoUnavailableError', message: 'No vehicle info available' })
      }
      this.vehicle = vehicleInfo
      return vehicleInfo.map(vehicle => {
        return {
          nickname: vehicle.nickname as string,
          vin: vehicle.vin as string
        }
      })
    } catch (error) {
      throw new NissanConnectError({ name: 'NotLoggedInError', message: 'Failed to login', cause: error })
    }
  }

  async refreshBatteryStatus(vin: string): Promise<IClientBatteryCheckResponse> {
    const statusResponse = await this.makeRequest<IStatusResponse>(vin, 'batteryStatusCheckRequest')
    if (statusResponse.status !== 200) {
      throw new NissanConnectError({ name: 'BatteryStatusUnavailableError', message: 'Failed to get battery status', cause: statusResponse })
    }
    return mapStatusResponse(statusResponse)
  }

  async batteryStatus(vin: string): Promise<IClientBatteryStatusResponse> {
    const batteryStatusResponse = await this.makeRequest<IBatteryStatusRecordsResponse>(vin, 'batteryStatusRecordsRequest')
    if (batteryStatusResponse.status !== 200) {
      throw new NissanConnectError({ name: 'BatteryStatusUnavailableError', message: 'Failed to get battery status', cause: batteryStatusResponse })
    }
    return mapBatteryStatusRecordsResponse(batteryStatusResponse)
  }

  async climateControlStatus(vin: string): Promise<IClientClimateControlStatusResponse> {
    const climateControlStatusResponse = await this.makeRequest<IRemoteACRecordsResponse>(vin, 'remoteACRecordsRequest')
    if (climateControlStatusResponse.status !== 200) {
      throw new NissanConnectError({ name: 'ClimateControlUnavailableError', message: 'Failed to get climate control status', cause: climateControlStatusResponse })
    }
    return mapClimateControlStatusResponse(climateControlStatusResponse)
  }

  async climateControlTurnOn(vin: string): Promise<IClientClimateControlTurnOnResponse> {
    const climateControlTurnOnResponse = await this.makeRequest<IACRemoteOnResponse>(vin, 'acRemoteRequest')
    if (climateControlTurnOnResponse.status !== 200) {
      throw new NissanConnectError({ name: 'ClimateControlUnavailableError', message: 'Failed to turn on climate control', cause: climateControlTurnOnResponse })
    }
    return mapClimateControlTurnOnResponse(climateControlTurnOnResponse)
  }

  async climateControlTurnOff(vin: string): Promise<IClientClimateControlTurnOffResponse> {
    const climateControlTurnOffResponse = await this.makeRequest<IACRemoteOffResponse>(vin, 'acRemoteOffRequest')
    if (climateControlTurnOffResponse.status !== 200) {
      throw new NissanConnectError({ name: 'ClimateControlUnavailableError', message: 'Failed to turn off climate control', cause: climateControlTurnOffResponse })
    }
    return mapClimateControlTurnOffResponse(climateControlTurnOffResponse)
  }

  async chargingStart(vin: string): Promise<IClientCharingStartResponse> {
    const chargingStartResponse = await this.makeRequest<IBatteryRemoteChargingResponse>(vin, 'batteryRemoteChargingRequest')
    if (chargingStartResponse.status !== 200) {
      throw new NissanConnectError({ name: 'ChargingUnavailableError', message: 'Failed to start charging', cause: chargingStartResponse })
    }
    return mapChargingStartResponse(chargingStartResponse)
  }

  private async makeRequest<T>(vin: string, action: keyof INissanConnectApiOperations): Promise<T> {
    const requestParams = this.getRequestParamsForVehicle(vin)
    const response = await this.apiInstance[action](requestParams) as AxiosResponse<T>
    return response.data
  }

  private getRequestParamsForVehicle(vin: string): IRequestOperationParameters {
    if (!this.loggedIn()) {
      throw new NissanConnectError({ name: "NotLoggedInError", message: 'Not logged in' })
    }

    if (!this.vehicle) {
      throw new NissanConnectError({ name: "VehicleInfoUnavailableError", message: 'No vehicle info available' })
    }

    const vehicle = this.vehicle.find(vehicle => vehicle.vin === vin);
    if (!vehicle) {
      throw new NissanConnectError({ name: "VehicleInfoUnavailableError", message: 'Vehicle not found' })
    }

    return {
      VIN: vehicle.vin,
      custom_sessionid: vehicle.customSessionId,
      DCMID: vehicle.dcmId,
      tz: vehicle.timezone,
      RegionCode: vehicle.regionCode,
      lg: vehicle.locale
    };
  }

  private loggedIn(): boolean {
    return this.isConnected && this.isLoggedIn
  }
}

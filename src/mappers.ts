import {
  IClientVehicles,
  IClientBatteryCheckResponse,
  IClientBatteryStatusResponse,
  IClientClimateControlTurnOnResponse,
  IClientClimateControlTurnOffResponse,
  IClientClimateControlStatusResponse,
  IClientCharingStartResponse
} from './types'

import {
  IVehicleResponse,
  IStatusResponse,
  IBatteryStatusRecordsResponse,
  IRemoteACRecordsResponse,
  IACRemoteOnResponse,
  IACRemoteOffResponse,
  IBatteryRemoteChargingResponse
} from './nissan-connect/types'

import { NissanConnectError } from './errors'

export function mapVehicleResponse(vehicleResponse: IVehicleResponse): IClientVehicles {
  const { VehicleInfoList } = vehicleResponse;
  const vehicles = VehicleInfoList?.vehicleInfo || VehicleInfoList?.VehicleInfo;

  if (!vehicles || !Array.isArray(vehicles) || vehicles.length === 0) {
    throw new NissanConnectError({ name: "VehicleInfoUnavailableError", message: 'No vehicle info available' });
  }

  const validVehicles = vehicles.filter(vehicle => vehicle.vin && vehicle.nickname);

  if (validVehicles.length === 0) {
    throw new NissanConnectError({ name: "VehicleInfoUnavailableError", message: 'No vehicle info with vin or nickname available' });
  }

  return validVehicles.map(vehicle => ({
    nickname: vehicle.nickname as string,
    vin: vehicle.vin as string,
    customSessionId: vehicle.custom_sessionid as string,
    dcmId: vehicleResponse.vehicle?.profile?.dcmId as string,
    timezone: vehicleResponse.CustomerInfo?.Timezone as string,
    regionCode: vehicleResponse.CustomerInfo?.RegionCode as string,
    locale: vehicleResponse.CustomerInfo?.Language as string
  }));
}

export function mapBatteryStatusRecordsResponse(batteryResponse: IBatteryStatusRecordsResponse): IClientBatteryStatusResponse {
  return {
    pluginState: batteryResponse?.BatteryStatusRecords?.PluginState,
    crusingRangeAcOn: batteryResponse?.BatteryStatusRecords?.CruisingRangeAcOn,
    crusingRangeAcOff: batteryResponse.BatteryStatusRecords?.CruisingRangeAcOff,
    batteryChargingStatus: batteryResponse?.BatteryStatusRecords?.BatteryStatus?.BatteryChargingStatus,
    batteryCapacity: batteryResponse?.BatteryStatusRecords?.BatteryStatus?.BatteryCapacity,
    batteryRemainingAmount: {
      WH: batteryResponse?.BatteryStatusRecords?.BatteryStatus?.BatteryRemainingAmountWH,
      kWH: batteryResponse?.BatteryStatusRecords?.BatteryStatus?.BatteryRemainingAmountkWH
    },
    batteryPercentage: batteryResponse?.BatteryStatusRecords?.BatteryStatus?.SOC?.Value,
    minutesToFull: batteryResponse?.BatteryStatusRecords?.TimeRequiredToFull?.MinutesRequiredToFull,
    minutesToFull200: batteryResponse?.BatteryStatusRecords?.TimeRequiredToFull200?.MinutesRequiredToFull
  }
}

export function mapClimateControlStatusResponse(climateControlResponse: IRemoteACRecordsResponse): IClientClimateControlStatusResponse {
  return {
    operationResult: climateControlResponse?.RemoteACRecords?.OperationResult,
    remoteACOperation: climateControlResponse?.RemoteACRecords?.RemoteACOperation,
  }
}

export function mapClimateControlTurnOnResponse(climateControlTurnOnResponse: IACRemoteOnResponse): IClientClimateControlTurnOnResponse {
  return {
    hvacStatus: climateControlTurnOnResponse?.hvacStatus,
  }
}

export function mapClimateControlTurnOffResponse(climateControlTurnOffResponse: IACRemoteOffResponse): IClientClimateControlTurnOffResponse {
  return {
    hvacStatus: climateControlTurnOffResponse?.hvacStatus,
  }
}

export function mapChargingStartResponse(chargingStartResponse: IBatteryRemoteChargingResponse): IClientCharingStartResponse {
  return {
    sent: chargingStartResponse.status === 200
  }
}

export function mapStatusResponse(statusResponse: IStatusResponse): IClientBatteryCheckResponse {
  return {
    sent: statusResponse.status === 200
  }
}

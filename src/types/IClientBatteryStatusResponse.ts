export interface IClientBatteryStatusResponse {
  batteryChargingStatus?: IChargingStatus
  batteryCapacity?: number
  pluginState?: IPluginState
  crusingRangeAcOn?: number
  crusingRangeAcOff?: number
  batteryRemainingAmount?: {
    WH?: number
    kWH?: number
  }
  batteryPercentage?: number
  minutesToFull?: number
  minutesToFull200?: number
}

type IChargingStatus = 'NOT_CHARGING' | 'CHARGING' | 'NORMAL_CHARGING' | 'RAPIDLY_CHARGING' | 'YES' | 'NO'
type IPluginState = 'NOT_CONNECTED' | 'CONNECTED' | 'QC_CONNECTED' | 'INVALID'

export interface IBatteryStatusRecordsResponse {
  status: number
  BatteryStatusRecords?: IBatteryStatusRecords
  NotificationDateAndTime?: string
  TargetDate?: string
}

interface IBatteryStatus {
  BatteryChargingStatus: IChargingStatus
  BatteryCapacity?: number
  BatteryRemainingAmount?: number
  BatteryRemainingAmountWH?: number
  BatteryRemainingAmountkWH?: number
  SOC: IStateOfCharge
}

// Leaf 2016 has SOC (State Of Charge) in BatteryStatus, a more accurate battery_percentage
interface IStateOfCharge {
  Value: number
}

interface IBatteryStatusRecords {
  OperationResult: string
  OperationDateAndTime: string
  BatteryStatus: IBatteryStatus
  PluginState?: IPluginState
  CruisingRangeAcOn?: number
  CruisingRangeAcOff?: number
  TimeRequiredToFull?: ITimeRequiredToFull
  TimeRequiredToFull200?: ITimeRequiredToFull
}

interface ITimeRequiredToFull {
  HourRequiredToFull: number
  MinutesRequiredToFull: number
}

type IPluginState = 'NOT_CONNECTED' | 'CONNECTED' | 'QC_CONNECTED' | 'INVALID'
type IChargingStatus = 'NOT_CHARGING' | 'CHARGING' | 'NORMAL_CHARGING' | 'RAPIDLY_CHARGING' | 'YES' | 'NO'

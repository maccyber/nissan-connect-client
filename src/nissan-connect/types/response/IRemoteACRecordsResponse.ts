export interface IRemoteACRecordsResponse {
  status: number
  message: string
  RemoteACRecords: IRemoteACRecords
  OperationDateAndTime: string
}

interface IRemoteACRecords {
  OperationResult: string
  OperationDateAndTime: string
  RemoteACOperation: string
  ACStartStopDateAndTime: string
  CruisingRangeAcOn: string
  CruisingRangeAcOff: string
  ACStartStopURL: string
  PluginState: string
  ACDurationBatterySec: string
  ACDurationPluggedSec: string
}

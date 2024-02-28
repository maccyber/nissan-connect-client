export default function () {
  return {
    status: 200,
    BatteryStatusRecords: {
      OperationResult: 'START',
      OperationDateAndTime: '2024/02/24 16:34',
      BatteryStatus: {
        BatteryChargingStatus: 'NOT_CHARGING',
        BatteryCapacity: '240',
        BatteryRemainingAmount: '220',
        BatteryRemainingAmountWH: '16720',
        BatteryRemainingAmountkWH: '',
        SOC: {
          Value: '85'
        }
      },
      PluginState: 'NOT_CONNECTED',
      CruisingRangeAcOn: '98000',
      CruisingRangeAcOff: '116000',
      TimeRequiredToFull: {
        HourRequiredToFull: '3',
        MinutesRequiredToFull: '30'
      },
      TimeRequiredToFull200: {
        HourRequiredToFull: '2',
        MinutesRequiredToFull: '0'
      },
      NotificationDateAndTime: '2024/02/24 15:34',
      TargetDate: '2024/02/24 15:34'
    }
  }
}

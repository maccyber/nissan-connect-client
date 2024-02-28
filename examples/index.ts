import { NissanConnectClient } from '../src'
import { RegionCode } from '../src/nissan-connect/types'

(async () => {
  const api = new NissanConnectClient({
    regionCode: RegionCode.Europe,
    debug: true,
    locale: 'en-US'
  })

  const response = await api.login(
    process.env.NISSAN_CONNECT_USERNAME || 'your-nissan-connect@mail.com',
    process.env.NISSAN_CONNECT_PASSWORD || 'password',
  )

  console.log(JSON.stringify(response, null, 2))

  const vin = response[0].vin

  const batteryStatusRecordsResponse = await api.batteryStatus(vin)
  console.log(JSON.stringify(batteryStatusRecordsResponse, null, 2))

  const climateControlRecordsResponse = await api.climateControlStatus(vin)
  console.log(JSON.stringify(climateControlRecordsResponse, null, 2))
})()


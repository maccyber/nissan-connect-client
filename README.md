# nissan-connect-client

- https://github.com/Shadow6363/carwings/blob/ab1b3a93713f74fbcecd08c7a2545c43051a177f/protocol.markdown?plain=1
- https://github.com/filcole/pycarwings2/blob/14d86dc39e93dfa9d9d2f375e2068d2a3025c0f2/pycarwings2/responses.py#L507

NB! This is not an official Nissan product.

The Nissan Connect Client is a TypeScript library that provides an interface for interacting with the NissanConnect API.
This library allows developers to easily integrate Nissan vehicle functionalities into their applications, such as retrieving vehicle information, controlling climate settings, and managing battery status.

## Requirements

Install [node.js](https://nodejs.org/en/)

## Installation

You can install the Nissan Connect Client via npm:
```js
npm install nissan-connect-client
```

## Usage

To use the Nissan Connect Client in your project, you need to import the NissanConnectClient class and instantiate it with the required parameters. Here's a basic example of how to use the client:

### Example

See [examples/index.js](examples/index.js)

### Setup client
```js
import { NissanConnectClient, RegionCode } from 'nissan-connect-client';

const session = new NissanConnectClient({
  regionCode: RegionCode.Europe,
  locale: 'en_GB',
  apiEndpoint: new URL('https://your-api-endpoint.com'),
  debug: false
});

try {
  // Login to the NissanConnect API
  const vehicleInfo = session.login('yourUsername', 'yourPassword');
  console.log('Successfully logged in. Vehicle info:', vehicleInfo);

  // Retrieve the battery status of the first vehicle in list
  const batteryStatus = await session.batteryStatus(vehicleInfo[0].vin);
} catch (error) {
  console.error(error);
};
```
## API Reference

### NissanConnectClient
- **Constructor**: `NissanConnectClient(options: { regionCode?: IRegion, locale?: string, apiEndpoint?: URL, debug?: boolean })`
  - Creates a new instance of the NissanConnectClient with the specified options.
  - **Parameters**:
    - `options`: An object containing optional parameters:
      - `regionCode` (optional): The region code of the NissanConnect service. Default is 'Europe'.
      - `locale` (optional): The locale/language setting for the client. Default is 'en_GB'.
      - `apiEndpoint` (optional): The URL endpoint of the NissanConnect API. Default is 'https://gdcportalgw.its-mo.com/api_v191225_NE/gdc'.
      - `debug` (optional): Set to `true` to enable debug mode. Default is `false`.

- **Methods**:
  - `login(userid: string, password: string): Promise<IClientVehicleResponse>`
    - Logs in to the NissanConnect API with the specified username and password.
    - **Parameters**:
      - `userid`: The username for the NissanConnect account.
      - `password`: The password for the NissanConnect account.
    - **Returns**:
      - A promise that resolves with the vehicle information upon successful login.
  - `refreshBatteryStatus(vin: string): Promise<IClientBatteryCheckResponse>`
    - Retrieves the current battery status of the vehicle with the specified VIN.
    - **Parameters**:
      - `vin`: The VIN (Vehicle Identification Number) of the vehicle.
    - **Returns**:
      - A promise that resolves with the battery status response.
  - `batteryStatus(vin: string): Promise<IClientBatteryStatusResponse>`
    - Retrieves battery status records of the vehicle with the specified VIN.
    - **Parameters**:
      - `vin`: The VIN (Vehicle Identification Number) of the vehicle.
    - **Returns**:
      - A promise that resolves with the battery status records response.
  - `climateControlStatus(vin: string): Promise<IClientClimateControlStatusResponse>`
    - Retrieves the current climate control status of the vehicle with the specified VIN.
    - **Parameters**:
      - `vin`: The VIN (Vehicle Identification Number) of the vehicle.
    - **Returns**:
      - A promise that resolves with the climate control status response.
  - `climateControlTurnOn(vin: string): Promise<IClientClimateControlTurnOnResponse>`
    - Turns on the climate control of the vehicle with the specified VIN.
    - **Parameters**:
      - `vin`: The VIN (Vehicle Identification Number) of the vehicle.
    - **Returns**:
      - A promise that resolves with the climate control status response after turning on.
  - `climateControlTurnOff(vin: string): Promise<IClientClimateControlTurnOffResponse>`
    - Turns off the climate control of the vehicle with the specified VIN.
    - **Parameters**:
      - `vin`: The VIN (Vehicle Identification Number) of the vehicle.
    - **Returns**:
      - A promise that resolves with the climate control status response after turning off.
  - `chargingStart(vin: string): Promise<IChargingStartResponse>`
    - Initiates remote charging of the vehicle with the specified VIN.
    - **Parameters**:
      - `vin`: The VIN (Vehicle Identification Number) of the vehicle.
    - **Returns**:
      - A promise that resolves with the charging status response.

# Region codes

| Region | Code |
|--------|------|
| Europe | NE   |
| Canada | NCI  |
| USA    | NNA  |
| Australia | NMA |
| Japan | NML |

# Contributing

Please use `npm run eslint-fix` to lint and fix the code before submitting a pull request`

This project uses jest for testing. Please use `npm test` to run the tests.

# License

[MIT](LICENSE)

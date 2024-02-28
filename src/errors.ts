type ErrorName = 'NotLoggedInError'
  | 'NotConnectedError'
  | 'VehicleInfoUnavailableError'
  | 'BatteryStatusUnavailableError'
  | 'ClimateControlUnavailableError'
  | 'ChargingUnavailableError'

class ErrorBase<T extends string> extends Error {
  name: T;
  message: string;
  cause: any;

  constructor({
    name,
    message,
    cause
  }: {
    name: T;
    message: string;
    cause?: any;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}

export class NissanConnectError extends ErrorBase<ErrorName> { }

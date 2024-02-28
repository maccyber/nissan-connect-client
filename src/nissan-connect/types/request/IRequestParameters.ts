import { type IConnectRequestParameters } from './IConnectRequestParameters'
import { type ILoginRequestParameters } from './ILoginRequestParameters'
import { type IRequestOperationParameters } from './IRequestOperationParameters'

export type IRequestParameters = IRequestOperationParameters | IConnectRequestParameters | ILoginRequestParameters

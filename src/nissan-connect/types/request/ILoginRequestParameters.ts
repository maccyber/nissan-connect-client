import { type IRegion } from './IRegion'

export interface ILoginRequestParameters {
  UserId: string
  Password: string
  initial_app_str: string
  RegionCode: IRegion
  lg: string
}

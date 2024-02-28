export enum RegionCode {
  Europe = 'NE',
  USA = 'NNA',
  Canada = 'NCI',
  Australia = 'NMA',
  Japan = 'NML'
}

export type IRegion = RegionCode.Europe | RegionCode.USA | RegionCode.Canada | RegionCode.Australia | RegionCode.Japan

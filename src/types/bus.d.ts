import { BUS_STOP_STATUS, BUS_EVENT_TYPE, BUS_ROUTE_TYPE } from '@/configs/bus';

export type BusRouteType = keyof typeof BUS_ROUTE_TYPE;
export type BusStopStatus = keyof typeof BUS_STOP_STATUS;
export type BusEventType = keyof typeof BUS_EVENT_TYPE;
export type BusDirection = 0 | 1;

export interface Bus {
  RouteUID: string;
  RouteID: string;
  HasSubRoutes: true;
  Operators: BusOperators[];
  AuthorityID: string;
  ProviderID: string;
  SubRoutes: BusSubRoutes[];
  BusRouteType: BusRouteType;
  RouteName: {
    Zh_tw: string;
    En: string;
  };
  DepartureStopNameZh: string;
  DepartureStopNameEn: string;
  DestinationStopNameZh: string;
  DestinationStopNameEn: string;
  TicketPriceDescriptionZh: string;
  TicketPriceDescriptionEn: string;
  FareBufferZoneDescriptionZh: string;
  FareBufferZoneDescriptionEn: string;
  RouteMapImageUrl: string;
  City: string;
  CityCode: string;
  UpdateTime: string;
  VersionID: number;
}

interface BusOperators {
  OperatorID: string;
  OperatorName: {
    Zh_tw: string;
    En: string;
  };
  OperatorCode: string;
  OperatorNo: string;
}

interface BusSubRoutes {
  SubRouteUID: string;
  SubRouteID: string;
  OperatorIDs: string[];
  SubRouteName: {
    Zh_tw: string;
    En: string;
  };
  Headsign: string;
  HeadsignEn: string;
  Direction: number;
  FirstBusTime: string;
  LastBusTime: string;
  HolidayFirstBusTime: string;
  HolidayLastBusTime: string;
}

export interface BusStop {
  StopUID: string;
  StopID: string;
  StopName: {
    Zh_tw: string;
    En: string;
  };
  StopBoarding: number;
  StopSequence: number;
  StopPosition: {
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  };
  StationID: string;
  StationGroupID: string;
  LocationCityCode: string;
  PlateNumb?: string;
  EstimateTime?: number;
  StopStatus: BusStopStatus;
  A2EventType: BusEventType;
  isLastStop: boolean;
}

export interface BusEstimatedTime {
  PlateNumb: string;
  StopUID: string;
  StopID: string;
  StopName: {
    Zh_tw: string;
    En: string;
  };
  RouteUID: string;
  RouteID: string;
  RouteName: {
    Zh_tw: string;
    En: string;
  };
  SubRouteUID: string;
  SubRouteID: string;
  SubRouteName: {
    Zh_tw: string;
    En: string;
  };
  Direction: 0 | 1;
  EstimateTime?: number;
  StopCountDown: number;
  CurrentStop: string;
  DestinationStop: string;
  StopSequence: number;
  StopStatus: number;
  MessageType: number;
  NextBusTime: string;
  IsLastBus: boolean;
  Estimates: Array<{
    PlateNumb: string;
    EstimateTime: number;
    IsLastBus: boolean;
    VehicleStopStatus: number;
  }>;
  DataTime: string;
  TransTime: string;
  SrcRecTime: string;
  SrcTransTime: string;
  SrcUpdateTime: string;
  UpdateTime: string;
}

export interface BusRealTimeNearStop {
  PlateNumb: string;
  OperatorID: string;
  RouteUID: string;
  RouteID: string;
  RouteName: {
    Zh_tw: string;
    En: string
  };
  SubRouteUID: string;
  SubRouteID: string;
  SubRouteName: {
    Zh_tw: string;
    En: string;
  };
  Direction: 0 | 1;
  StopUID: string;
  StopID: string;
  StopName: {
    Zh_tw: string;
    En: string;
  };
  StopSequence: number;
  MessageType: number;
  DutyStatus: number;
  BusStatus: number;
  A2EventType: keyof typeof BUS_EVENT_TYPE;
  GPSTime: string;
  TransTime: string;
  SrcRecTime: string;
  SrcTransTime: string;
  SrcUpdateTime: string;
  UpdateTime: string;
}

import {
  BusStopStatusEnum,
  BusEvent,
  BUS_ROUTE_TYPE,
  BUS_CRUMB,
} from '@/configs/bus';
import type { CityCode, City } from '@/types/city';

export type BusStopStatus = BusStopStatusEnum;
export type BusEventType = BusEvent;
export type BusRouteType = keyof typeof BUS_ROUTE_TYPE;
export type BusCrumbType = keyof typeof BUS_CRUMB;
export type BusDirection = 0 | 1;
export type BusStops = Record<BusDirection, BusStop[]>;

export interface Bus {
  RouteUID: string;
  RouteID: string;
  HasSubRoutes: boolean;
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
  Direction: BusDirection;
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
  Direction: BusDirection;
  EstimateTime?: number;
  StopCountDown: number;
  CurrentStop: string;
  DestinationStop: string;
  StopSequence: number;
  StopStatus: BusStopStatus;
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
  Direction: BusDirection;
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
  A2EventType: BusEventType;
  GPSTime: string;
  TransTime: string;
  SrcRecTime: string;
  SrcTransTime: string;
  SrcUpdateTime: string;
  UpdateTime: string;
}

export interface BusSite extends Bus, BusEstimatedTime {
  StationName: {
    Zh_tw: string;
    En: string;
  };
}

export interface BusShape {
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
  Direction: BusDirection;
  Geometry: string;
  EncodedPolyline: string;
  UpdateTime: string;
  VersionID: number;
}

export interface BusStation {
  StationUID: string;
  StationID: string;
  StationName: {
    Zh_tw: string;
    En: string;
  };
  StationPosition: {
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  };
  StationAddress: string;
  StationGroupID: string;
  Stops: Array<{
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
  }>;
  LocationCityCode: CityCode;
  Bearing: string;
  UpdateTime: string;
  distance: number;
  VersionID: number;
}

export interface GeometryMap {
  stop: Array<BusStopMap>;
  stopPit: Array<BusStopMap>;
  line: Array<StopLine>;
}

export interface StopLine {
  color: string;
  geometry: Array<[number, number]>;
}

export interface BusStopMap {
  geometry: [number, number];
  stopName: string;
  status: string;
  isPit: boolean;
  stopStatus: BusStopStatus;
}

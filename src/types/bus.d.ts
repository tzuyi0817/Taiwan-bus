export interface Bus {
  RouteUID: string;
  RouteID: string;
  HasSubRoutes: true;
  Operators: BusOperators[];
  AuthorityID: string;
  ProviderID: string;
  SubRoutes: BusSubRoutes[];
  BusRouteType: 0;
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

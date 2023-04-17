export enum BusStopStatusEnum {
  NORMAL,
  NOT_START,
  NOT_STOP,
  LAST_PASSED,
  NOT_OPERATE,
}

export const BUS_STOP_STATUS = {
  [BusStopStatusEnum.NORMAL]: 'normal',
  [BusStopStatusEnum.NOT_START]: 'unStarted',
  [BusStopStatusEnum.NOT_STOP]: 'traffic_control',
  [BusStopStatusEnum.LAST_PASSED]: 'last_passed',
  [BusStopStatusEnum.NOT_OPERATE]: 'unOperate',
} as const;

export const BUS_STOP_STATUS_BACKGROUND = {
  [BusStopStatusEnum.NORMAL]: 'bg-primary',
  [BusStopStatusEnum.NOT_START]: 'bg-[#A9A9A9]',
  [BusStopStatusEnum.NOT_STOP]: 'bg-[#A9A9A9]',
  [BusStopStatusEnum.LAST_PASSED]: 'bg-[#A9A9A9]',
  [BusStopStatusEnum.NOT_OPERATE]: 'bg-[#A9A9A9]',
} as const;

export const BUS_STOP_TEXT_COLOR = {
  [BusStopStatusEnum.NORMAL]: 'text-black',
  [BusStopStatusEnum.NOT_START]: 'text-gray-600',
  [BusStopStatusEnum.NOT_STOP]: 'text-gray-600',
  [BusStopStatusEnum.LAST_PASSED]: 'text-gray-600',
  [BusStopStatusEnum.NOT_OPERATE]: 'text-gray-600',
} as const;

export const BUS_STOP_TOOLTIP_CLASS = {
  [BusStopStatusEnum.NORMAL]: 'tooltip_base',
  [BusStopStatusEnum.NOT_START]: 'tooltip_gray',
  [BusStopStatusEnum.NOT_STOP]: 'tooltip_gray',
  [BusStopStatusEnum.LAST_PASSED]: 'tooltip_gray',
  [BusStopStatusEnum.NOT_OPERATE]: 'tooltip_gray',
} as const;

export enum BusEvent {
  LEFT,
  PIT,
}

export const BUS_EVENT_TYPE = {
  [BusEvent.LEFT]: 'removed',
  [BusEvent.PIT]: 'pitting',
} as const;

export const BUS_ROUTE_TYPE = {
  11:'city_bus',
  12:'road_bus',
  13:'highway_bus',
  14:'shuttle_bus',
} as const;

export const BUS_CRUMB = {
  searchStop: 'search_stop',
  nearbyStop: 'nearby_stop',
  favoriteStop: 'my_collection',
} as const;

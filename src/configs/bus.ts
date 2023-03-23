export enum BusStopStatusEnum {
  NORMAL,
  NOT_START,
  NOT_STOP,
  LAST_PASSED,
  NOT_OPERATE,
}

export const BUS_STOP_STATUS = {
  [BusStopStatusEnum.NORMAL]: '正常',
  [BusStopStatusEnum.NOT_START]: '尚未發車',
  [BusStopStatusEnum.NOT_STOP]: '交管不停',
  [BusStopStatusEnum.LAST_PASSED]: '末班已過',
  [BusStopStatusEnum.NOT_OPERATE]: '今未營運',
} as const;

export const BUS_STOP_STATUS_BACKGROUND = {
  [BusStopStatusEnum.NORMAL]: 'bg-primary',
  [BusStopStatusEnum.NOT_START]: 'bg-[#A9A9A9]',
  [BusStopStatusEnum.NOT_STOP]: 'bg-[#A9A9A9]',
  [BusStopStatusEnum.LAST_PASSED]: 'bg-[#A9A9A9]',
  [BusStopStatusEnum.NOT_OPERATE]: 'bg-[#A9A9A9]',
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
  [BusEvent.LEFT]: '已離站',
  [BusEvent.PIT]: '進站中',
} as const;

export const BUS_ROUTE_TYPE = {
  11:'市區公車',
  12:'公路客運',
  13:'國道客運',
  14:'接駁車',
} as const;

export const BUS_CRUMB = {
  searchStop: '站點查詢',
  nearbyStop: '附近站牌',
  favoriteStop: '我的收藏',
} as const;

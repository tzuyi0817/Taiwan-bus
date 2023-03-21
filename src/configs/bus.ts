export enum BusStopStatusEnum {
  NORMAL = 0,
}

export const BUS_STOP_STATUS = {
  [BusStopStatusEnum.NORMAL]: '正常',
  1: '尚未發車',
  2: '交管不停',
  3: '末班已過',
  4: '今未營運',
} as const;

export const BUS_STOP_STATUS_BACKGROUND = {
  0: 'bg-primary',
  1: 'bg-[#A9A9A9]',
  2: 'bg-[#A9A9A9]',
  3: 'bg-[#A9A9A9]',
  4: 'bg-[#A9A9A9]',
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

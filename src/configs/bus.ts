export const BUS_STOP_STATUS = {
  0: '正常',
  1: '尚未發車',
  2: '交管不停靠',
  3: '末班車已過',
  4: '今日未營運',
} as const;

export const BUS_STOP_STATUS_BACKGROUND = {
  0: 'bg-primary',
  1: 'bg-[#A9A9A9]',
  2: 'bg-[#A9A9A9]',
  3: 'bg-[#A9A9A9]',
  4: 'bg-[#A9A9A9]',
} as const;

export const BUS_EVENT_TYPE = {
  0: '已離站',
  1: '進站中',
} as const;

export const BUS_ROUTE_TYPE = {
  11:'市區公車',
  12:'公路客運',
  13:'國道客運',
  14:'接駁車',
} as const;
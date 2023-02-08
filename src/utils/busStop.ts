import type { BusStop } from '@/types/bus';

export function getBusStopStatus({ EstimateTime, A2EventType }: BusStop) {
  const estimateTime = (EstimateTime ?? 0) / 60 | 0;
  const isPitStop = A2EventType === 1;
  const isPittingStop = EstimateTime !== undefined && estimateTime === 0;

  return { estimateTime, isPitStop, isPittingStop };
}

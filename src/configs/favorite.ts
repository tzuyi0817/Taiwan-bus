export enum FavoriteTypeEnum {
  STOP,
  STATION,
}

export const FAVORITE_TYPE_MAP = {
  bus: FavoriteTypeEnum.STOP,
  site: FavoriteTypeEnum.STATION
} as const;

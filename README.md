# Taiwan Bus

## Description

This is a `Taiwan Bus` website.  
Provide Taiwan bus route and stop sign query.

## Development

Clone this repository and install dependencies by running `pnpm`(Node.js version is 18.12.0), then:

- `pnpm dev`: Run in development mode
- `pnpm build`: Build in production mode
- `pnpm preview`: Run preview

## Project Files

```text
src/
├── apis/
│   ├── bus.ts
│   └── station.ts
├── assets/
│   ├── icon/*
│   └── images/*
├── components/
│   ├── common/
│   │   ├── BusCarousel.tsx
│   │   ├── BusCrumb.tsx
│   │   ├── BusDetail.tsx
│   │   ├── BusFavorite.tsx
│   │   ├── BusFooter.tsx
│   │   ├── BusHeader.tsx
│   │   ├── BusIcon.tsx
│   │   ├── BusItem.tsx
│   │   ├── BusMap.tsx
│   │   ├── BusRipples.tsx
│   │   ├── BusStopInfo.tsx
│   │   ├── BusTab.tsx
│   │   ├── BusTimer.tsx
│   │   ├── Loading.tsx
│   │   ├── MapAutoReCenter.tsx
│   │   ├── MapEvents.tsx
│   │   ├── Popup.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SearchSelect.tsx
│   │   └── SwitchBlock.tsx
│   ├── favoriteStop/
│   │   ├── FavoriteStopBlock.tsx
│   │   ├── FavoriteStopBus.tsx
│   │   └── FavoriteStopStation.tsx
│   ├── index/
│   │   ├── IndexCarousel.tsx
│   │   ├── IndexCities.tsx
│   │   └── IndexPopup.tsx
│   ├── nearbyStop/
│   │   ├── NearbyStopBlock.tsx
│   │   ├── NearbyStopInfo.tsx
│   │   ├── NearbyStopStation.tsx
│   │   └── NearbyStopStops.tsx
│   ├── searchBus/
│   │   ├── SearchBusBlock.tsx
│   │   └── SearchBusKeyboard.tsx
│   └── searchStop/
│       └── SearchStopBlock.tsx
├── config/
│   ├── bus.ts
│   ├── city.ts
│   ├── favorite.ts
│   ├── keyboard.ts
│   ├── marker.ts
│   └── svg.ts
├── hooks/
│   ├── useGeolocation.ts
│   ├── useRedux.ts
│   └── useScrollToTop.ts
├── pages/
│   ├── FavoriteStop.tsx
│   ├── Index.tsx
│   ├── NearbyStop.tsx
│   ├── NotFound.tsx
│   ├── SearchBus.tsx
│   └── SearchStop.tsx
├── provider/
│   └── BusProvider.tsx
├── router/
│   └── index.tsx
├── store/
│   ├── city.ts
│   ├── favorite.ts
│   └── index.ts
├── style/
│   ├── common/
|   │   ├── all.css
│   │   ├── button.css
│   │   ├── carousel.css
│   │   ├── ellipsis.css
│   │   ├── fade.css
│   │   ├── marker.css
│   │   ├── mask.css
│   │   ├── popup.css
│   │   ├── scrollbar.css
│   │   ├── searchBar.css
│   │   ├── searchSelect.css
│   │   ├── svg.css
│   │   ├── switchButton.css
│   │   ├── text.css
|   │   └── tooltip.css
│   ├── pages/
|   │   ├── all.css
|   │   ├── bus.css
|   │   └── favorite.css
│   ├── index.css
│   └── tailwind.css
├── types/
│   ├── bus.d.ts
│   ├── city.d.ts
│   ├── common.d.ts
│   └── page.d.ts
├── utils/
│   ├── ajax.ts
│   ├── busStop.ts
│   ├── common.ts
│   ├── generateParams.ts
│   ├── generateToken.ts
│   └── images.ts
├── App.tsx
├── axios.d.ts
├── vite-env.d.ts
└── main.tsx
```

## Use Technology

- react
- react-dom
- react-router-dom
- react-responsive-carousel
- react-leaflet
- react-ripples
- react-hot-toast
- react-i18next
- redux
- redux-persist
- typescript
- tailwindcss
- vite
- leaflet
- vanilla-tilt
- i18next
- i18next-browser-languagedetector

## Third Party Service

- [Transport Data eXchange (TDX)](https://tdx.transportdata.tw/api-service/swagger)
- [Mapbox](https://www.mapbox.com/)
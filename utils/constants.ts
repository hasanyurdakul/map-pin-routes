export const MAP_CONSTANTS = {
  TILE_LAYER: {
    URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ATTRIBUTION:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  MARKER_ICONS: {
    RETINA_URL: '/marker-icon-2x.png',
    ICON_URL: '/marker-icon.png',
    SHADOW_URL: '/marker-shadow.png',
  },
  ROUTE: {
    COLOR: '#2196F3',
    WEIGHT: 3,
    OPACITY: 0.7,
  },
  POPUP: {
    OFFSET: [150, 50] as [number, number],
  },
};

export const COORDINATE_PRECISION = 6;

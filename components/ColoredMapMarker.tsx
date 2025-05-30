import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Important: Import CSS for Leaflet

export function ColoredMapMarker(color: string): L.DivIcon {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path fill="${color}" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3" fill="white"/>
  </svg>`;

  return L.divIcon({
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, 0],
    html: svgString,
    className: 'custom-div-icon',
  });
}

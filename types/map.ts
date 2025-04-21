export interface MapMarker {
  position: [number, number];
  color: string;
  name?: string;
  latitude?: number;
  longitude?: number;
}

export interface MapProps {
  center: [number, number];
  zoom: number;
  onMarkerPlaced?: (position: [number, number]) => void;
  markers?: MapMarker[];
  drawRoute?: boolean;
}

export interface LocationMarkerProps {
  onMarkerPlaced?: (position: [number, number]) => void;
}

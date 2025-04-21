import { Marker, Popup } from 'react-leaflet';
import { MapMarker } from '@/types/map';
import { ColoredMapMarker } from '../ColoredMapMarker';
import { memo } from 'react';
import styles from './styles/MapMarker.module.css';
import { formatCoordinate, getMarkerPosition } from '@/utils/mapUtils';
import { MAP_CONSTANTS } from '@/utils/constants';

interface MapMarkersProps {
  markers: MapMarker[];
}

const MapMarkersComponent = ({ markers }: MapMarkersProps) => {
  return (
    <>
      {markers.map((marker, index) => {
        const position = getMarkerPosition(marker);
        return (
          <Marker key={index} position={position} icon={ColoredMapMarker(marker.color)}>
            {marker.name && (
              <Popup closeButton={false} offset={MAP_CONSTANTS.POPUP.OFFSET}>
                <div className={styles.popup}>
                  <strong className={styles.popupTitle}>{marker.name}</strong>
                  <div className={styles.popupInfo}>
                    <div className={styles.coordinateInfo}>
                      Latitude: {formatCoordinate(position[0])}
                    </div>
                    <div className={styles.coordinateInfo}>
                      Longitude: {formatCoordinate(position[1])}
                    </div>
                  </div>
                </div>
              </Popup>
            )}
          </Marker>
        );
      })}
    </>
  );
};

export const MapMarkers = memo(MapMarkersComponent);
MapMarkers.displayName = 'MapMarkers';

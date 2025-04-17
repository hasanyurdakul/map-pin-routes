import { create } from 'zustand';
import { MarkedLocation } from './../types/markedLocation';
import { persist } from 'zustand/middleware';

type MarkedLocationState = {
  MarkedLocations: MarkedLocation[];
};

type MarkedLocationActions = {
  addMarkedLocation: (location: Omit<MarkedLocation, 'id'>) => void;
  updateMarkedLocation: (locationId: string, updatedLocation: Partial<MarkedLocation>) => void;
  removeMarkedLocation: (locationId: string) => void;
};

type MarkedLocationStore = MarkedLocationState & MarkedLocationActions;

export const useMarkedLocationStore = create<MarkedLocationStore>()(
  persist(
    set => ({
      MarkedLocations: [],
      addMarkedLocation: location => {
        set(state => ({
          MarkedLocations: [
            ...state.MarkedLocations,
            {
              ...location,
              id: crypto.randomUUID(),
            },
          ],
        }));
      },
      updateMarkedLocation: (locationId, updatedLocation) => {
        set(state => ({
          MarkedLocations: state.MarkedLocations.map(location =>
            location.id === locationId ? { ...location, ...updatedLocation } : location
          ),
        }));
      },
      removeMarkedLocation: locationId => {
        set(state => ({
          MarkedLocations: state.MarkedLocations.filter(location => location.id !== locationId),
        }));
      },
    }),
    {
      name: 'marked-locations-storage',
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MarkedLocation } from '@/types/form';

interface MarkedLocationStore {
  MarkedLocations: MarkedLocation[];
  addMarkedLocation: (location: Omit<MarkedLocation, 'id'>) => void;
  updateMarkedLocation: (id: string, location: Omit<MarkedLocation, 'id'>) => void;
  deleteMarkedLocation: (id: string) => void;
  getMarkedLocation: (id: string) => MarkedLocation | null;
}

export const useMarkedLocationStore = create<MarkedLocationStore>()(
  persist(
    (set, get) => ({
      MarkedLocations: [],
      addMarkedLocation: location =>
        set(state => ({
          MarkedLocations: [
            ...state.MarkedLocations,
            { ...location, id: Math.random().toString(36).substring(7) },
          ],
        })),
      updateMarkedLocation: (id, location) =>
        set(state => ({
          MarkedLocations: state.MarkedLocations.map(loc =>
            loc.id === id ? { ...location, id } : loc
          ),
        })),
      deleteMarkedLocation: id =>
        set(state => ({
          MarkedLocations: state.MarkedLocations.filter(location => location.id !== id),
        })),
      getMarkedLocation: id => {
        const state = get();
        return state.MarkedLocations.find(location => location.id === id) ?? null;
      },
    }),
    {
      name: 'marked-locations',
    }
  )
);

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './zustandStorage';


type WaterStore = {
  waterDrinkStamps: number[];
  addWater: () => void;
  resetWater: () => void;
};

export const useWaterStore = create<WaterStore>()(
  persist(
    (set, get) => ({
      waterDrinkStamps: [],

      // ✅ Get existing + add new
      addWater: () => {
        const current = get().waterDrinkStamps;

        const updated = [...current, Date.now()];

        set({ waterDrinkStamps: updated });
      },

      resetWater: () => set({ waterDrinkStamps: [] }),
    }),
    {
      name: 'water-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

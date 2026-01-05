import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "./zustandStorage";

interface PedometerStore {
  stepCount: number;
  dailyGoal: number;
  distance: number;
  lastActiveDate: string;

  // NEW
  baselineSteps: number | null;
  lastSensorSteps: number | null;

  addSensorSteps: (sensorSteps: number) => void;
  resetStep: () => void;
  setDailyGoal: (goal: number) => void;
  checkAndResetDaily: () => void;
}

const getToday = () => new Date().toDateString();
const STEP_LENGTH_M = 0.78;

export const usePedometerStore = create<PedometerStore>()(
  persist(
    (set, get) => ({
      stepCount: 0,
      dailyGoal: 5000,
      distance: 0,
      lastActiveDate: getToday(),

      baselineSteps: null,
      lastSensorSteps: null,

      addSensorSteps: (sensorSteps) => {
        const { baselineSteps, lastSensorSteps } = get();

        // first reading → set baseline
        if (baselineSteps === null) {
          set({
            baselineSteps: sensorSteps,
            lastSensorSteps: sensorSteps,
          });
          return;
        }

        if (lastSensorSteps === null) {
          set({ lastSensorSteps: sensorSteps });
          return;
        }

        const delta = sensorSteps - lastSensorSteps;

        if (delta > 0) {
          set((state) => ({
            stepCount: state.stepCount + delta,
            distance: state.distance + delta * STEP_LENGTH_M,
            lastSensorSteps: sensorSteps,
          }));
        }
      },

      resetStep: () =>
        set({
          stepCount: 0,
          distance: 0,
          baselineSteps: null,
          lastSensorSteps: null,
          lastActiveDate: getToday(),
        }),

      setDailyGoal: (goal) => set({ dailyGoal: goal }),

      checkAndResetDaily: () => {
        const today = getToday();
        const lastDate = get().lastActiveDate;

        if (lastDate !== today) {
          set({
            stepCount: 0,
            distance: 0,
            baselineSteps: null,
            lastSensorSteps: null,
            lastActiveDate: today,
          });
        }
      },
    }),
    {
      name: "pedometer-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

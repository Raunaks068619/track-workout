import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { defaultSchedule } from '@/data/plan';
import { todayKey } from '@/lib/date';
import type { CheckinState, ScheduleSlot } from '@/lib/types';

interface AppState {
  schedule: ScheduleSlot[];
  checkins: CheckinState;
  hydrated: boolean;
  setHydrated: () => void;
  updateSlot: (id: string, patch: Partial<ScheduleSlot>) => void;
  resetSchedule: () => void;
  checkIn: (slotId: string) => void;
  uncheckIn: (slotId: string) => void;
  isCheckedInToday: (slotId: string) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      schedule: defaultSchedule,
      checkins: {},
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      updateSlot: (id, patch) =>
        set((state) => ({
          schedule: state.schedule.map((slot) =>
            slot.id === id ? { ...slot, ...patch } : slot
          ),
        })),
      resetSchedule: () => set({ schedule: defaultSchedule }),
      checkIn: (slotId) =>
        set((state) => ({
          checkins: {
            ...state.checkins,
            [slotId]: {
              date: todayKey(),
              checkedInAt: new Date().toISOString(),
            },
          },
        })),
      uncheckIn: (slotId) =>
        set((state) => {
          const next = { ...state.checkins };
          delete next[slotId];
          return { checkins: next };
        }),
      isCheckedInToday: (slotId) => {
        const entry = get().checkins[slotId];
        return !!entry && entry.date === todayKey();
      },
    }),
    {
      name: 'workout-tracker-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        schedule: state.schedule,
        checkins: state.checkins,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

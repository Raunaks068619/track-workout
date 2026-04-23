export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export type WorkoutType =
  | 'Upper A'
  | 'Upper B'
  | 'Lower 1'
  | 'Lower 2'
  | 'Rest / Cardio'
  | 'Rest';

export type ExerciseCategory = 'warmup' | 'compound' | 'accessory' | 'isolation';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rir?: number;
  cue: string;
  category: ExerciseCategory;
  videoId?: string;
}

export interface Workout {
  type: WorkoutType;
  focus?: string;
  exercises: Exercise[];
}

export interface ScheduleSlot {
  id: string;
  time: string;
  label: string;
  notifyEnabled: boolean;
  renotifyMinutes: number;
}

export interface CheckinEntry {
  date: string;
  checkedInAt: string;
}

export type CheckinState = Record<string, CheckinEntry>;

export interface UserPrefs {
  schedule: ScheduleSlot[];
}

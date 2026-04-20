import type {
  DayOfWeek,
  ScheduleSlot,
  Workout,
  WorkoutType,
} from '@/lib/types';

export const weeklySplit: Record<DayOfWeek, WorkoutType> = {
  Mon: 'Upper A',
  Tue: 'Lower 1',
  Wed: 'Rest / Cardio',
  Thu: 'Upper B',
  Fri: 'Lower 2',
  Sat: 'Rest / Cardio',
  Sun: 'Rest',
};

export const workouts: Record<WorkoutType, Workout> = {
  'Upper A': {
    type: 'Upper A',
    focus: 'Horizontal Focus',
    exercises: [
      { id: 'ua1', name: 'Bench Press', sets: 3, reps: '6-8', rir: 2, category: 'compound', cue: 'Arch back, feet planted. Bar to lower chest, full lockout.' },
      { id: 'ua2', name: 'Barbell Row', sets: 3, reps: '8-10', rir: 2, category: 'compound', cue: 'Hinge forward, pull bar to lower ribs. Squeeze shoulder blades.' },
      { id: 'ua3', name: 'Incline DB Press', sets: 3, reps: '8-10', rir: 2, category: 'compound', cue: '30-45° incline. Press dumbbells up and slightly together.' },
      { id: 'ua4', name: 'Lat Pulldown', sets: 3, reps: '10-12', rir: 1, category: 'accessory', cue: "Wide grip, pull to upper chest. Don't lean back excessively." },
      { id: 'ua5', name: 'Lateral Raise', sets: 3, reps: '12-15', rir: 1, category: 'isolation', cue: 'Slight bend in elbow, raise to shoulder height. Control the negative.' },
      { id: 'ua6', name: 'Bicep Curl', sets: 2, reps: '10-12', rir: 1, category: 'isolation', cue: 'Elbows pinned to sides. Full range, squeeze at top.' },
      { id: 'ua7', name: 'Triceps Pushdown', sets: 2, reps: '10-12', rir: 1, category: 'isolation', cue: 'Elbows locked. Extend fully, control on the way up.' },
    ],
  },
  'Upper B': {
    type: 'Upper B',
    focus: 'Vertical Focus',
    exercises: [
      { id: 'ub1', name: 'Overhead Press', sets: 3, reps: '6-8', rir: 2, category: 'compound', cue: 'Tight core, press straight up. Head through at lockout.' },
      { id: 'ub2', name: 'Pull-up (or Assisted)', sets: 3, reps: '6-10', rir: 1, category: 'compound', cue: 'Full hang at bottom. Pull chest to bar, not chin over.' },
      { id: 'ub3', name: 'Dips (or Close-grip Bench)', sets: 3, reps: '8-10', rir: 2, category: 'compound', cue: 'Lean slightly forward for chest, upright for triceps.' },
      { id: 'ub4', name: 'Seated Cable Row', sets: 3, reps: '10-12', rir: 1, category: 'accessory', cue: 'Chest up, pull to lower ribs. Squeeze mid-back at end.' },
      { id: 'ub5', name: 'Face Pull', sets: 3, reps: '12-15', rir: 1, category: 'isolation', cue: 'Rope to forehead level, elbows high. Hit rear delts.' },
      { id: 'ub6', name: 'Hammer Curl', sets: 2, reps: '10-12', rir: 1, category: 'isolation', cue: 'Neutral grip (thumbs up). Hits brachialis and forearm.' },
      { id: 'ub7', name: 'Overhead Triceps Extension', sets: 2, reps: '10-12', rir: 1, category: 'isolation', cue: 'Elbows by ears, stretch at bottom. Long-head emphasis.' },
    ],
  },
  'Lower 1': {
    type: 'Lower 1',
    focus: 'Quad Focus',
    exercises: [
      { id: 'l1w', name: '90/90 Stretch', sets: 3, reps: '15/leg', category: 'warmup', cue: 'Front and back knee at 90°. Rotate hips, hold each side.' },
      { id: 'l11', name: 'Back Squat (or Leg Press)', sets: 3, reps: '6-10', rir: 2, category: 'compound', cue: 'Feet shoulder-width. Sit between your legs, knees track over toes.' },
      { id: 'l12', name: 'Bulgarian Split Squat', sets: 3, reps: '10-12', rir: 2, category: 'compound', cue: 'Rear foot elevated. Drop straight down, front knee stays stacked.' },
      { id: 'l13', name: 'Leg Extension', sets: 3, reps: '12-15', rir: 1, category: 'isolation', cue: 'Full extension, squeeze quads at top. Slow negative.' },
      { id: 'l14', name: 'Seated Leg Curl', sets: 3, reps: '12', rir: 1, category: 'isolation', cue: 'Pin hips back. Curl heels under seat, squeeze hamstrings.' },
      { id: 'l15', name: 'Standing Calf Raise', sets: 3, reps: '15-20', rir: 1, category: 'isolation', cue: "Full stretch at bottom, pause at top. Don't bounce." },
    ],
  },
  'Lower 2': {
    type: 'Lower 2',
    focus: 'Hinge & Glute Focus',
    exercises: [
      { id: 'l21', name: 'Romanian Deadlift', sets: 3, reps: '8-10', rir: 2, category: 'compound', cue: "Soft knees, push hips back. Feel hamstring stretch, don't round back." },
      { id: 'l22', name: 'Hip Thrust', sets: 3, reps: '10-12', rir: 2, category: 'compound', cue: 'Upper back on bench, chin tucked. Drive through heels, squeeze glutes at top.' },
      { id: 'l23', name: 'DB Walking Lunges', sets: 3, reps: '10/leg', rir: 1, category: 'compound', cue: 'Long step, drop back knee. Push through front heel to stand.' },
      { id: 'l24', name: 'Seated Leg Curl', sets: 2, reps: '12-15', rir: 1, category: 'isolation', cue: 'Controlled, full range. Prioritize stretch and squeeze.' },
      { id: 'l25', name: 'Seated Calf Raise', sets: 3, reps: '12-15', rir: 1, category: 'isolation', cue: 'Knees bent version. Hits the soleus (deep calf).' },
      { id: 'l26', name: 'Superman', sets: 3, reps: '12', rir: 1, category: 'accessory', cue: 'Face down, lift arms and legs. Hold briefly, squeeze lower back.' },
    ],
  },
  'Rest / Cardio': { type: 'Rest / Cardio', exercises: [] },
  Rest: { type: 'Rest', exercises: [] },
};

export const defaultSchedule: ScheduleSlot[] = [
  { id: 'wake_up', time: '06:30', label: 'Wake up', notifyEnabled: true, renotifyMinutes: 10 },
  { id: 'pre_workout', time: '07:00', label: 'Pre-workout', notifyEnabled: true, renotifyMinutes: 10 },
  { id: 'gym', time: '07:30', label: 'Gym', notifyEnabled: true, renotifyMinutes: 15 },
  { id: 'post_workout', time: '09:00', label: 'Post-workout meal', notifyEnabled: true, renotifyMinutes: 15 },
  { id: 'breakfast', time: '10:00', label: 'Breakfast', notifyEnabled: true, renotifyMinutes: 15 },
  { id: 'lunch', time: '13:30', label: 'Lunch', notifyEnabled: true, renotifyMinutes: 15 },
  { id: 'snack', time: '17:00', label: 'Snack', notifyEnabled: true, renotifyMinutes: 15 },
  { id: 'dinner', time: '20:30', label: 'Dinner', notifyEnabled: true, renotifyMinutes: 15 },
  { id: 'sleep', time: '23:00', label: 'Sleep', notifyEnabled: true, renotifyMinutes: 30 },
];

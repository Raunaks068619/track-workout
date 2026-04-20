import { weeklySplit, workouts } from '@/data/plan';
import { dayOfWeek } from './date';
import type { Workout } from './types';

export function getTodaysWorkout(date: Date = new Date()): Workout {
  const day = dayOfWeek(date);
  const type = weeklySplit[day];
  return workouts[type];
}

export function isWorkoutDay(date: Date = new Date()): boolean {
  return getTodaysWorkout(date).exercises.length > 0;
}

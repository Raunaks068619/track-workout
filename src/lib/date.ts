import { format } from 'date-fns';
import type { DayOfWeek } from './types';

const dayMap: Record<number, DayOfWeek> = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

export function todayKey(date: Date = new Date()): string {
  return format(date, 'yyyy-MM-dd');
}

export function dayOfWeek(date: Date = new Date()): DayOfWeek {
  return dayMap[date.getDay()];
}

export function fullDayName(date: Date = new Date()): string {
  return format(date, 'EEEE');
}

export function timeLabel(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return format(d, 'h:mm a');
}

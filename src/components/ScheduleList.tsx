'use client';

import { useAppStore } from '@/store/useAppStore';
import { timeLabel, todayKey } from '@/lib/date';
import styles from './ScheduleList.module.css';

export function ScheduleList() {
  const hydrated = useAppStore((s) => s.hydrated);
  const schedule = useAppStore((s) => s.schedule);
  const checkins = useAppStore((s) => s.checkins);
  const checkIn = useAppStore((s) => s.checkIn);
  const uncheckIn = useAppStore((s) => s.uncheckIn);

  if (!hydrated) {
    return <div className={styles.placeholder}>Loading schedule…</div>;
  }

  const today = todayKey();
  const sorted = [...schedule].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <ul className={styles.list}>
      {sorted.map((slot) => {
        const entry = checkins[slot.id];
        const done = !!entry && entry.date === today;
        return (
          <li key={slot.id} className={styles.row}>
            <div className={styles.timeCol}>
              <span className={styles.time}>{timeLabel(slot.time)}</span>
              <span className={styles.label}>{slot.label}</span>
            </div>
            {done ? (
              <button
                className={`${styles.btn} ${styles.done}`}
                onClick={() => uncheckIn(slot.id)}
                aria-label={`Undo check in for ${slot.label}`}
              >
                ✓ Done
              </button>
            ) : (
              <button
                className={`${styles.btn} ${styles.checkBtn}`}
                onClick={() => checkIn(slot.id)}
              >
                Check in
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

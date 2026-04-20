'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { TodayCard } from '@/components/TodayCard';
import { ScheduleList } from '@/components/ScheduleList';
import { fullDayName } from '@/lib/date';
import { getTodaysWorkout, isWorkoutDay } from '@/lib/dayResolver';

export default function HomePage() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <main className={styles.main}>
        <div className={styles.loading}>Loading…</div>
      </main>
    );
  }

  const workout = getTodaysWorkout(now);
  const showStart = isWorkoutDay(now);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Today</p>
          <h1 className={styles.dayName}>{fullDayName(now)}</h1>
        </div>
        <Link href="/settings" aria-label="Settings" className={styles.iconBtn}>
          <SettingsIcon />
        </Link>
      </header>

      <TodayCard workout={workout} />

      {showStart ? (
        <Link href="/workout" className={styles.startBtn}>
          Start Workout
        </Link>
      ) : (
        <div className={styles.restBlurb}>Rest day — recover well 💪</div>
      )}

      <section className={styles.scheduleSection}>
        <h2 className={styles.sectionTitle}>Schedule</h2>
        <ScheduleList />
      </section>

      <footer className={styles.footer}>
        <span>Track Workout • PWA</span>
      </footer>
    </main>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

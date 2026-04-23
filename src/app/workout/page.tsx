'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { getTodaysWorkout } from '@/lib/dayResolver';
import { ExerciseListModal } from '@/components/ExerciseListModal';
import { VideoEmbed } from '@/components/VideoEmbed';
import type { Workout } from '@/lib/types';

export default function WorkoutPage() {
  const router = useRouter();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [index, setIndex] = useState(0);
  const [listOpen, setListOpen] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    setWorkout(getTodaysWorkout(new Date()));
  }, []);

  useEffect(() => {
    if (!workout) return;
    if (workout.exercises.length === 0) {
      router.replace('/');
    }
  }, [workout, router]);

  useEffect(() => {
    let cancelled = false;

    const requestLock = async () => {
      if (typeof navigator === 'undefined') return;
      const anyNav = navigator as Navigator & {
        wakeLock?: { request: (type: 'screen') => Promise<WakeLockSentinel> };
      };
      if (!anyNav.wakeLock) return;
      try {
        const lock = await anyNav.wakeLock.request('screen');
        if (cancelled) {
          lock.release().catch(() => {});
        } else {
          wakeLockRef.current = lock;
        }
      } catch {
        // permission denied or unsupported — ignore
      }
    };

    requestLock();

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && !wakeLockRef.current) {
        requestLock();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibility);
      const lock = wakeLockRef.current;
      wakeLockRef.current = null;
      lock?.release().catch(() => {});
    };
  }, []);

  if (!workout || workout.exercises.length === 0) {
    return <main className={styles.empty}>Loading…</main>;
  }

  const current = workout.exercises[index];
  const next = workout.exercises[index + 1];
  const isLast = index === workout.exercises.length - 1;

  const handleNext = () => {
    if (isLast) {
      router.push('/');
      return;
    }
    setIndex((i) => i + 1);
  };

  const handleExit = () => {
    if (confirmExit) {
      router.push('/');
      return;
    }
    setConfirmExit(true);
    setTimeout(() => setConfirmExit(false), 2500);
  };

  const handleJump = (i: number) => {
    setIndex(i);
    setListOpen(false);
  };

  return (
    <main className={styles.main}>
      <header className={styles.topBar}>
        <button
          className={styles.iconBtn}
          aria-label="Exit workout"
          onClick={handleExit}
        >
          {confirmExit ? <span className={styles.confirm}>Exit?</span> : '×'}
        </button>
        <div className={styles.progress}>
          {index + 1} of {workout.exercises.length}
        </div>
        <button
          className={styles.iconBtn}
          aria-label="Show all exercises"
          onClick={() => setListOpen(true)}
        >
          ☰
        </button>
      </header>

      <section className={styles.body}>
        <p className={styles.category}>{current.category}</p>
        <h1 className={styles.exerciseName}>{current.name}</h1>
        <p className={styles.setsReps}>
          {current.sets} × {current.reps}
          {typeof current.rir === 'number' ? ` • RIR ${current.rir}` : ''}
        </p>
        <p className={styles.cue}>{current.cue}</p>
        <VideoEmbed
          key={current.id}
          videoId={current.videoId}
          title={current.name}
        />
      </section>

      <div className={styles.bottom}>
        <button className={styles.nextBtn} onClick={handleNext}>
          {isLast ? (
            <span>Finish Workout ✓</span>
          ) : (
            <>
              <span className={styles.nextLabel}>Next</span>
              <span className={styles.nextName}>{next?.name}</span>
              <span className={styles.arrow}>→</span>
            </>
          )}
        </button>
      </div>

      {listOpen ? (
        <ExerciseListModal
          workout={workout}
          currentIndex={index}
          onClose={() => setListOpen(false)}
          onSelect={handleJump}
        />
      ) : null}
    </main>
  );
}

'use client';

import { useEffect } from 'react';
import styles from './ExerciseListModal.module.css';
import type { Workout } from '@/lib/types';

interface Props {
  workout: Workout;
  currentIndex: number;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export function ExerciseListModal({
  workout,
  currentIndex,
  onClose,
  onSelect,
}: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="All exercises"
    >
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} />
        <header className={styles.header}>
          <div>
            <h3 className={styles.title}>{workout.type}</h3>
            {workout.focus ? (
              <p className={styles.subtitle}>{workout.focus}</p>
            ) : null}
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>
        <ul className={styles.list}>
          {workout.exercises.map((ex, i) => {
            const isCurrent = i === currentIndex;
            return (
              <li key={ex.id}>
                <button
                  className={`${styles.row} ${isCurrent ? styles.current : ''}`}
                  onClick={() => onSelect(i)}
                >
                  <span className={styles.index}>{i + 1}</span>
                  <span className={styles.body}>
                    <span className={styles.name}>{ex.name}</span>
                    <span className={styles.meta}>
                      {ex.sets} × {ex.reps}
                      {typeof ex.rir === 'number' ? ` • RIR ${ex.rir}` : ''}
                    </span>
                  </span>
                  {isCurrent ? <span className={styles.dot} aria-hidden /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

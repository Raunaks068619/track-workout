import styles from './TodayCard.module.css';
import type { Workout } from '@/lib/types';

export function TodayCard({ workout }: { workout: Workout }) {
  const isRest = workout.exercises.length === 0;
  return (
    <div className={`${styles.card} ${isRest ? styles.rest : ''}`}>
      <p className={styles.label}>Today's session</p>
      <h2 className={styles.title}>{workout.type}</h2>
      {workout.focus ? <p className={styles.focus}>{workout.focus}</p> : null}
      {!isRest ? (
        <p className={styles.meta}>
          {workout.exercises.length} exercises
        </p>
      ) : null}
    </div>
  );
}

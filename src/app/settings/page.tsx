'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.css';
import { useAppStore } from '@/store/useAppStore';

const RENOTIFY_OPTIONS = [5, 10, 15, 30];

export default function SettingsPage() {
  const hydrated = useAppStore((s) => s.hydrated);
  const schedule = useAppStore((s) => s.schedule);
  const updateSlot = useAppStore((s) => s.updateSlot);
  const resetSchedule = useAppStore((s) => s.resetSchedule);
  const [notifyStatus, setNotifyStatus] = useState<string>('');

  const requestNotifications = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setNotifyStatus('Notifications not supported on this device.');
      return;
    }
    try {
      const result = await Notification.requestPermission();
      if (result === 'granted') {
        setNotifyStatus('Notifications enabled. Push delivery comes in Phase 2.');
      } else if (result === 'denied') {
        setNotifyStatus('Notifications blocked. Update browser settings to allow.');
      } else {
        setNotifyStatus('Notification permission dismissed.');
      }
    } catch {
      setNotifyStatus('Could not request notification permission.');
    }
  };

  const sendTestNotification = () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setNotifyStatus('Notifications not supported on this device.');
      return;
    }
    if (Notification.permission !== 'granted') {
      setNotifyStatus('Enable notifications first.');
      return;
    }
    new Notification('Track Workout', {
      body: 'Test notification — looking good 💪',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
    });
    setNotifyStatus('Test notification sent.');
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href="/" aria-label="Back" className={styles.backBtn}>
          ←
        </Link>
        <h1 className={styles.title}>Settings</h1>
        <span className={styles.spacer} />
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Notifications</h2>
        <p className={styles.note}>
          Phase 2 ships server-side push delivery. For now this just gates the
          browser permission so push works once it lands.
        </p>
        <div className={styles.btnRow}>
          <button className={styles.primaryBtn} onClick={requestNotifications}>
            Enable notifications
          </button>
          <button className={styles.ghostBtn} onClick={sendTestNotification}>
            Send test
          </button>
        </div>
        {notifyStatus ? <p className={styles.status}>{notifyStatus}</p> : null}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Schedule</h2>
          <button className={styles.linkBtn} onClick={resetSchedule}>
            Reset
          </button>
        </div>
        {!hydrated ? (
          <p className={styles.note}>Loading…</p>
        ) : (
          <ul className={styles.list}>
            {schedule.map((slot) => (
              <li key={slot.id} className={styles.row}>
                <div className={styles.rowHead}>
                  <input
                    type="text"
                    className={styles.labelInput}
                    value={slot.label}
                    onChange={(e) =>
                      updateSlot(slot.id, { label: e.target.value })
                    }
                  />
                  <input
                    type="time"
                    className={styles.timeInput}
                    value={slot.time}
                    onChange={(e) =>
                      updateSlot(slot.id, { time: e.target.value })
                    }
                  />
                </div>
                <div className={styles.rowControls}>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={slot.notifyEnabled}
                      onChange={(e) =>
                        updateSlot(slot.id, { notifyEnabled: e.target.checked })
                      }
                    />
                    <span>Notify</span>
                  </label>
                  <label className={styles.selectWrap}>
                    <span className={styles.selectLabel}>Re-notify</span>
                    <select
                      value={slot.renotifyMinutes}
                      onChange={(e) =>
                        updateSlot(slot.id, {
                          renotifyMinutes: Number(e.target.value),
                        })
                      }
                      className={styles.select}
                    >
                      {RENOTIFY_OPTIONS.map((m) => (
                        <option key={m} value={m}>
                          {m} min
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

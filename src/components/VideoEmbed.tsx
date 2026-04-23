'use client';

import { useState } from 'react';
import styles from './VideoEmbed.module.css';

interface Props {
  videoId?: string;
  title: string;
}

export function VideoEmbed({ videoId, title }: Props) {
  const [active, setActive] = useState(false);
  const [thumbBroken, setThumbBroken] = useState(false);

  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${title} form tutorial`,
  )}`;

  if (!videoId) {
    return (
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fallback}
      >
        <span className={styles.playIcon} aria-hidden>▶</span>
        Search "{title}" on YouTube
      </a>
    );
  }

  if (active) {
    return (
      <div className={styles.frameWrap}>
        <iframe
          className={styles.frame}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={`${title} demo`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  const thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={styles.thumbWrap}>
      <button
        type="button"
        className={styles.thumbBtn}
        onClick={() => setActive(true)}
        aria-label={`Play demo for ${title}`}
      >
        {!thumbBroken ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbUrl}
            alt=""
            className={styles.thumb}
            loading="lazy"
            onError={() => setThumbBroken(true)}
          />
        ) : (
          <div className={styles.thumbPlaceholder} aria-hidden />
        )}
        <span className={styles.playOverlay}>
          <span className={styles.playBtn} aria-hidden>▶</span>
          <span className={styles.playText}>Watch form demo</span>
        </span>
      </button>
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.openLink}
      >
        Open in YouTube ↗
      </a>
    </div>
  );
}

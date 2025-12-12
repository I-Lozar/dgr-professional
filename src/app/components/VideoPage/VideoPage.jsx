"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./videoPage.module.css";

export default function VideoPage({ machine }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [fadeOverlay, setFadeOverlay] = useState(true);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const videoMp4 = `/images/spark-${machine}/video/main.mp4`;
  const videoWebm = `/images/spark-${machine}/video/main.webm`;

  useEffect(() => {
    const timer = setTimeout(() => setFadeOverlay(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Overlay deja de capturar clics
  useEffect(() => {
    if (!fadeOverlay) {
      const overlay = document.querySelector(`.${styles.overlay}`);
      if (overlay) overlay.style.pointerEvents = "none";
    }
  }, [fadeOverlay]);

  // Actualizar timeline
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  // Control sonido con fade-in
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (muted) {
      video.muted = false;
      video.volume = 0;
      const fade = setInterval(() => {
        video.volume = Math.min(video.volume + 0.05, 1);
        if (video.volume >= 1) clearInterval(fade);
      }, 80);
    } else {
      video.muted = true;
    }

    setMuted(!muted);
  };

  // Play / Pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.wrapper}>

      {/* Overlay inicial */}
      <div className={`${styles.overlay} ${fadeOverlay ? "" : styles.overlayHidden}`} />

      {/* Botón Volver */}
      <Link href={`/spark/${machine}`} className={styles.backButton}>
        <span className={styles.backArrow}>←</span> Volver
      </Link>

      {/* HEADER */}
      <div className={styles.header}>
        <h1>Vídeo oficial — {machine}</h1>
        <p className={styles.subtitle}>Descubre la potencia de {machine}.</p>
      </div>

      {/* VIDEO */}
      <div className={styles.videoContainer} ref={containerRef}>
        
        {!videoLoaded && (
          <div className={styles.loaderWrapper}>
            <div className={styles.loader}></div>
          </div>
        )}

        <video
          ref={videoRef}
          className={`${styles.video} ${videoLoaded ? styles.videoVisible : ""}`}
          autoPlay
          muted={muted}
          playsInline
          loop={false}
          onLoadedData={() => setVideoLoaded(true)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={videoWebm} type="video/webm" />
          <source src={videoMp4} type="video/mp4" />
        </video>

        {/* Botón sonido */}
        <button className={styles.soundButton} onClick={toggleMute}>
          {muted ? "🔇" : "🔊"}
        </button>

        {/* Botón Play / Pause */}
        <button className={styles.playButton} onClick={togglePlay}>
          {isPlaying ? "❚❚" : "►"}
        </button>

        {/* Timeline */}
        <div className={styles.timelineWrapper}>
          <div className={styles.timeline}>
            <div className={styles.timelineProgress} style={{ width: `${progress}%` }}></div>
          </div>
        </div>

      </div>
    </div>
  );
}

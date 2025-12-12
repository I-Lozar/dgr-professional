"use client";

import { useState, useEffect } from "react";
import styles from "./hero.module.css";

export default function Hero({ data, machine }) {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [machineLoaded, setMachineLoaded] = useState(false);
  const [fadeStarted, setFadeStarted] = useState(false);
  const [key, setKey] = useState(machine);

  useEffect(() => {
    setKey(machine);
    setBgLoaded(false);
    setMachineLoaded(false);
    setFadeStarted(false);

    // Fade negro inicial (20–50ms)
    const timer = setTimeout(() => setFadeStarted(true), 50);
    return () => clearTimeout(timer);
  }, [machine]);

  if (!data) return null;

  const basePath = data.image.replace("main.webp", "");
  const bgImage = `${basePath}main.webp`;
  const machineImage = `${basePath}main.png`;

  /* PARALLAX */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const bg = document.querySelector(`.${styles.backgroundImage}`);
      const machineEl = document.querySelector(`.${styles.machine}`);

      if (bg) bg.style.transform = `translateY(${scrollY * 0.08}px)`;
      if (machineEl) machineEl.style.transform = `translateY(${-scrollY * 0.04}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section key={key} className={`${styles.hero} ${styles[machine]}`}>

      {/* FADE NEGRO INICIAL */}
      <div
        className={`${styles.initialFade} ${
          fadeStarted ? styles.fadeOut : ""
        }`}
      ></div>

      {/* Preload fondo */}
      <img
        src={bgImage}
        alt=""
        className={styles.preloadBg}
        onLoad={() => setBgLoaded(true)}
      />

      {/* Fondo */}
      <div
        className={`${styles.backgroundImage} ${
          bgLoaded ? styles.bgVisible : ""
        }`}
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Máquina PNG */}
      {bgLoaded && (
        <div className={styles.machineWrapper}>
          <img
            src={machineImage}
            alt={machine}
            className={`${styles.machine} ${
              machineLoaded ? styles.machineVisible : ""
            }`}
            onLoad={() => setMachineLoaded(true)}
          />
        </div>
      )}

      {/* TEXTO: LOGO CORPORATIVO + SUBTÍTULO */}
      <div className={styles.content}>
        <img
          src={`/images/spark-${machine}/hero/logo.png`}
          alt={`${machine} logo`}
          className={styles.logo}
        />
        <p>{data.subtitle}</p>
      </div>
    </section>
  );
}

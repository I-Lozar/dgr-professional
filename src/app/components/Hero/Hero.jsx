"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./hero.module.css";

export default function Hero({ data, machine }) {
  const bgRef = useRef(null);
  const machineRef = useRef(null);

  const [bgLoaded, setBgLoaded] = useState(false);
  const [machineLoaded, setMachineLoaded] = useState(false);

  // Controla que el efecto eléctrico se dispare una sola vez por máquina
  const [electrifyOn, setElectrifyOn] = useState(false);
  const electrifiedForRef = useRef({}); // { dash: true, strike: true, ... }

  const { bgImage, machineImage } = useMemo(() => {
    if (!data?.image) return { bgImage: "", machineImage: "" };

    const basePath = data.image.replace(/main\.webp(\?.*)?$/, "");
    return {
      bgImage: `${basePath}main.webp`,
      machineImage: `${basePath}main.png`,
    };
  }, [data?.image]);

  useEffect(() => {
    if (!bgImage || !machineImage) return;

    let cancelled = false;

    // Reset de cargas al cambiar máquina
    setBgLoaded(false);
    setMachineLoaded(false);

    // Reset del trigger visual (se volverá a activar cuando esté listo)
    setElectrifyOn(false);

    const bg = new Image();
    const mach = new Image();

    const onBg = () => {
      if (cancelled) return;
      setBgLoaded(true);
    };

    const onMach = () => {
      if (cancelled) return;
      setMachineLoaded(true);
    };

    bg.addEventListener("load", onBg);
    bg.src = bgImage;
    if (bg.complete) onBg();

    mach.addEventListener("load", onMach);
    mach.src = machineImage;
    if (mach.complete) onMach();

    return () => {
      cancelled = true;
      bg.removeEventListener("load", onBg);
      mach.removeEventListener("load", onMach);
    };
  }, [bgImage, machineImage, machine]);

  // Cuando el hero está 100% listo, disparamos electrificación (1 vez por máquina) con delay
  useEffect(() => {
    const fullyReady = bgLoaded && machineLoaded;
    if (!fullyReady) return;

    if (electrifiedForRef.current[machine]) return;

    const delayMs = 2000; // <-- 2s después de estar listo
    const durationMs = 1700; // <-- duración aproximada del efecto (ajusta si cambias CSS)

    const start = setTimeout(() => {
      // doble-check por si cambió el estado/máquina durante el delay
      if (!(bgLoaded && machineLoaded)) return;
      if (electrifiedForRef.current[machine]) return;

      electrifiedForRef.current[machine] = true;
      setElectrifyOn(true);

      const stop = setTimeout(() => setElectrifyOn(false), durationMs);
      electrifiedForRef.current.__stop = stop;
    }, delayMs);

    return () => {
      clearTimeout(start);
      if (electrifiedForRef.current.__stop) {
        clearTimeout(electrifiedForRef.current.__stop);
        delete electrifiedForRef.current.__stop;
      }
    };
  }, [bgLoaded, machineLoaded, machine]);

  // Parallax con refs + primer “sync” al montar
useEffect(() => {
  const handleScroll = () => {
    const y = window.scrollY || 0;

    if (bgRef.current) {
      bgRef.current.style.setProperty("--bg-scroll-y", `${y * 0.08}px`);
    }
    if (machineRef.current) {
      machineRef.current.style.setProperty("--machine-scroll-y", `${-y * 0.04}px`);
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  if (!data) return null;

  // Fade negro: se va cuando el hero está listo
  const ready = bgLoaded && machineLoaded;

  return (
    <section key={machine} className={`${styles.hero} ${styles[machine]}`}>
      {/* FADE NEGRO: se va cuando ready */}
      <div className={`${styles.initialFade} ${ready ? styles.fadeOut : ""}`} />

      {/* Fondo */}
      <div
        ref={bgRef}
        className={[
          styles.backgroundImage,
          bgLoaded ? styles.bgVisible : "",
          electrifyOn ? styles.electrify : "",
        ].join(" ")}
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Máquina */}
      <div className={styles.machineWrapper}>
        <img
          ref={machineRef}
          src={machineImage}
          alt={machine}
          className={`${styles.machine} ${machineLoaded ? styles.machineVisible : ""}`}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Texto */}
      <div className={styles.content}>
        <img
          src={`/images/spark-${machine}/hero/logo.png`}
          alt={`${machine} logo`}
          className={styles.logo}
          loading="eager"
          decoding="async"
        />
        <p>{data.subtitle}</p>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import styles from "./loPrincipal.module.css";

export default function LoPrincipal({ data, machine }) {
  if (!data || !data.cards) return null;

  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const el = sliderRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  const slide = (dir) => {
    const el = sliderRef.current;
    if (!el) return;

    const cardWidth = el.children[0].clientWidth + 28;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });

    setTimeout(updateArrows, 400);
  };

  return (
    <section className={styles.section}>

      {/* HEADER DE LA SECCIÓN */}
      <div className={styles.header}>
        <h2>Lo principal.</h2>
        <Link href={`/spark/${machine}/video`} className={styles.link}>
          Ver el vídeo
          <span className={styles.arrowSymbol}>→</span>
        </Link>
      </div>

      {/* Sombras laterales */}
      <div className={`${styles.leftShadow} ${canScrollLeft ? styles.visible : ""}`}></div>
      <div className={`${styles.rightShadow} ${canScrollRight ? styles.visible : ""}`}></div>

      {/* Carrusel */}
      <div
        className={styles.slider}
        ref={sliderRef}
        onScroll={updateArrows}
      >
        {data.cards.map((card, i) => (
          <div className={styles.card} key={i}>

            <p className={styles.intro}>{card.intro}</p>
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.description}>{card.description}</p>

            <div className={styles.imageWrapper}>
              <img src={card.image} alt={card.title} />
            </div>

          </div>
        ))}
      </div>

      {/* Flechas */}
      <div className={styles.arrows}>
        <button
          className={`${styles.arrow} ${!canScrollLeft ? styles.disabled : ""}`}
          onClick={() => slide(-1)}
        >
          ‹
        </button>
        <button
          className={`${styles.arrow} ${!canScrollRight ? styles.disabled : ""}`}
          onClick={() => slide(1)}
        >
          ›
        </button>
      </div>

    </section>
  );
}

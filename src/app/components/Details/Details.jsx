"use client";

import styles from "./details.module.css";

export default function Details({ machine }) {
  // Rutas dinámicas de imágenes según máquina
  const base = `/images/spark-${machine}/details`;

  const detailsImage = `${base}/details-1.png`;
  const accessoriesImage = `${base}/details-2.png`;

  return (
    <section className={styles.section}>

      {/* HEADER */}
      <div className={styles.header}>
        <h2>Los detalles.</h2>
      </div>

      {/* Imagen 1: detalles de la máquina */}
      <div className={styles.imageBlock}>
        <img src={detailsImage} alt={`Detalles ${machine}`} />
      </div>

      {/* Imagen 2: accesorios */}
      <div className={styles.imageBlock}>
        <img src={accessoriesImage} alt={`Accesorios ${machine}`} />
      </div>

    </section>
  );
}

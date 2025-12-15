"use client";

import Link from "next/link";
import styles from "@/app/styles/components/PostHeader/postHeader.module.css";

const machines = [
  { id: "dash", name: "DGR Dash", image: "/images/spark-dash/hero/main.png" },
  { id: "strike", name: "DGR Strike", image: "/images/spark-strike/hero/main.png" },
  { id: "zero", name: "DGR Zero", image: "/images/spark-zero/hero/main.png" },
  { id: "storm", name: "DGR Storm", image: "/images/spark-storm/hero/main.png" }
];

export default function PostHeader({ current }) {
  return (
    <nav className={styles.wrapper}>
      <div className={styles.inner}>
        {machines.map((m) => (
          <Link
            key={m.id}
            href={`/spark/${m.id}`}
            data-id={m.id}  /* <-- AÑADIDO */
            className={`${styles.item} ${current === m.id ? styles.active : ""}`}
          >
            <img src={m.image} alt={m.name} className={styles.icon} />
            <span className={styles.name}>{m.name}</span>
            <span className={styles.new}>Nuevo</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

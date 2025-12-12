"use client";
import { useState } from "react";
import styles from "@/app/styles/components/Finder/finder.module.css";

export default function Finder() {
  const [query, setQuery] = useState("");

  const distributors = [
    { name: "TechPro Sevilla", location: "Sevilla", tel: "654 123 987" },
    { name: "Electro Málaga", location: "Málaga", tel: "622 987 321" },
    { name: "ValenTech", location: "Valencia", tel: "612 333 222" },
  ];

  const results = distributors.filter((d) =>
    d.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Distribuidor Finder</h1>
      <input
        type="text"
        placeholder="Busca tu ciudad..."
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className={styles.results}>
        {results.length === 0 && <p>No hay distribuidores en esta zona.</p>}
        {results.map((d, i) => (
          <div key={i} className={styles.card}>
            <h3>{d.name}</h3>
            <p>{d.location}</p>
            <span>{d.tel}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
